# nasa-meteorite
Visualize meteorite data gathered from NASA

In this project, I gathered meteorite information (more than 40000 samples) from NASA and visualize their locations 
using WebGL Globe (https://github.com/dataarts/webgl-globe). 
The meteorites are classified based on their masses (less than 10g, between 10 and 100g, and greater than 100g).

Moreover, I also added information about close-approach asteroids using NeoWs (Near Earth Object Web Service) API 
(https://api.nasa.gov/api.html#NeoWS). The data are updated daily. 

Finally, the website is deployed using Google App Engine with the webapp2 framework.
