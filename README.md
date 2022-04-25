## Image optimization service

[![CI Build](https://github.com/ahashem/image-optimizer/actions/workflows/build.yml/badge.svg)](https://github.com/ahashem/image-optimizer/actions/workflows/build.yml)

### Development
 - Use current node version from `.nvmrc` file `$> nvm install`, or make sure you've at least Node 12.x installed
 - Next run `$> npm install`
 - Start Dev server with `$> npm run dev`
 - Open the sample HTML example in browser. `examples/frontend/simple-resize.html`  
 - For Production ready build: `$> npm run build && npm start`

### API
- In HTML; use
```html
<img src="http://image-optimizer-service/widthxheight/https://path-to-hosted-image.jpg" >
```
- HTTP request:
```shell
$> curl --request GET -sL \
     --url 'http://image-optimizer-service/widthxheight/https://path-to-hosted-image.jpg' \
     --output './path/to/file'
```


### Roadmap
 - [x] NodeJS API-first microservice; created using [personal template repository](https://github.com/ahashem/express-boilerplate-service)
 - [x] Health check endpoints
 - [x] CI checks for build
 - [x] Happy scenario image fetching and resizing API using [Sharp](https://www.npmjs.com/package/sharp) 
 - [ ] Dockerfile
 - [ ] Added security layer (with URL tokens and/or hashing)
 - [ ] Usage patterns: (e.g with CDN, with caching layer and proxy-server, serverless approach)
 - [ ] Telemetry support
 - [ ] Logging Middleware
 - [ ] API versioning
 - [ ] Deployment descriptors
 - [ ] Continuous Deployments support

### Caveats
 TBD
