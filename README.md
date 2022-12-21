# Image-processing-API
<!-- 21/12/2022 3:01 AM -->
## scripts needed

- Install: npm install
- Build: npm run build
- Lint: npm run lint
- Prettier: npm run prettier
- Run unit tests: npm run test
- Start server: npm run start

### port at 5000

- http://localhost:5000/

### endpoints 

- http://localhost:3000/api/images

to get an Image you have to type one of the available imagenames:

- encenadaport
- fjord
- icelandwaterfall
- palmtunnel
- santamonica

### examples:
- http://localhost:3000/api/images?imageName=fjord (_this will show the image without resizing_)
- http://localhost:3000/api/images?filename=fjord&width=100&height=100 (_this will resize the image to width:100 and height:100_)

notes: 
- negative values of width and/or height and/or typing the wrong image name will raise an error
- images that are *Resized* will be stored in a new folder in **assets/full/new**

made by <br />
*__Hossam Barakat__*
