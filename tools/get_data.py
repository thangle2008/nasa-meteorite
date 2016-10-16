import requests
import json

data = None

url = "https://data.nasa.gov/resource/y77d-th95.json"

response = requests.get(url)
if response.status_code == 200:
    data = response.json()

res = [["0", []], ["10", []], ["100", []]]

locations = dict()

# maxs and mins in 3 series
mass_mins = [float('inf')] * 3
mass_maxs = [0.0] * 3

# process data
for d in data:
	# skip unknown location
	if 'geolocation' not in d:
		continue

	lon, lat = d['geolocation']['coordinates']

	# if mass is unknown, assign 0
	mass = 0.0
	if 'mass' in d:
		mass = float(d['mass'])

	if mass < 10:
		res[0][1] = res[0][1] + [lat, lon, mass]
		mass_mins[0] = min(mass_mins[0], mass)
		mass_maxs[0] = max(mass_maxs[0], mass)
	elif 10 <= mass <= 100:
		res[1][1] = res[1][1] + [lat, lon, mass]
		mass_mins[1] = min(mass_mins[1], mass)
		mass_maxs[1] = max(mass_maxs[1], mass)
	else:
		res[2][1] = res[2][1] + [lat, lon, mass]
		mass_mins[2] = min(mass_mins[2], mass)
		mass_maxs[2] = max(mass_maxs[2], mass)

# normalize the masses in each series
for s in range(0, 3):
	print len(res[s][1])
	for i in range(2, len(res[s][1]), 3):
		res[s][1][i] = (res[s][1][i] - mass_mins[s]) / (mass_maxs[s] - mass_mins[s])

with open('data.json', 'w') as outfile:
	json.dump(res, outfile)
	