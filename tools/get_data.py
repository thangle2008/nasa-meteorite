import requests
import json

data = None

url = "https://data.nasa.gov/resource/y77d-th95.json?$query=SELECT * WHERE year IS NOT NULL ORDER BY year DESC"

response = requests.get(url)
if response.status_code == 200:
    data = response.json()

res = [["series A", []],]

locations = dict()
mag_min = float('inf')
mag_max = 0.0

for d in data:
	if 'geolocation' not in d:
		continue
	lat = float(d['reclat'])
	lon = float(d['reclong'])

	# skip unknown locations
	if lat == 0 and lon == 0:
		continue

	geol = (lon, lat)
	if geol not in locations:
		locations[geol] = 1.0
	else:
		locations[geol] += 1.0
	mag_min = min(mag_min, locations[geol])
	mag_max = max(mag_max, locations[geol])

for coord in locations:
	lon, lat = coord
	# normalize the data and scale
	mag = (locations[coord] - mag_min) / (mag_max - mag_min) + 0.05

	res[0][1] = res[0][1] + [lat, lon, mag]

with open('data.json', 'w') as outfile:
	json.dump(res, outfile)
	