import requests
import json

data = None

url = "https://data.nasa.gov/resource/y77d-th95.json?$query=SELECT * WHERE year IS NOT NULL ORDER BY year DESC LIMIT 5000"

response = requests.get(url)
if response.status_code == 200:
    data = response.json()

res = [["series A", []],]

locations = dict()

for d in data:
	if 'geolocation' not in d:
		continue
	lon, lat = d['geolocation']['coordinates']
	geol = (lon, lat)
	if geol not in locations:
		locations[geol] = 1.0
	else:
		locations[geol] += 1.0

for coord in locations:
	lon, lat = coord
	# normalize the data
	mag = locations[coord] / 10.0

	res[0][1] = res[0][1] + [lat, lon, mag]

with open('data.json', 'w') as outfile:
	json.dump(res, outfile)
	