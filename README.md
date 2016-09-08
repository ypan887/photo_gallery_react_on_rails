# Introduction

This is an Rails project with React Integration. First, I followed a React tutorial and developed the photo gallery effect, but I rewrite the Repo in ES6. Then I expended the project with an upload component and refactored its structure with Redux following the container and presentational pattern.

The oringinal tutorial project is [here](https://github.com/materliu/gallery-by-react), Thanks MaterLiu for this awesome tutorial

My ES6 version of the tutorial code is [here](https://github.com/ypan887/photo_gallary)


## Features
- ReactJS
- Redux
- React on Rails
- Ajax upload to Aws S3
- Crop Image

### React on Rails
I used React on Rails becasue I needed a rails backend to manage my uploaded images. Since I already had a working react project after refactered the tutorial project with ES6.

##### Why React on Rails
I have three choices to implement my rails backend: React Rails gem, React on Rails, Rails Api. The first two approach are quite similar. With React on Rails, your React code lives inside the client folder separately and there are very few steps needed to set up and run (Just register your rails component and call the top component in Rails view). However, there are some downsides. For example, I have struggled quite a bit trying to get Redux set up with React on Rails. There aren't many articles for beginners on doing Redux and server rendering with React on Rails (There are tons articles if you are just doing it just in node). The two tutorial project on their website also seems too complicate for starter.  

I choose react on rails in the end because I can get an running app fast, and deploy it the heroku easily. Although the Rails Api approach may be the better solution for production enviorment, since free host plan on heroku sleeps every 6 hours, it may not be a good place for the Api approach (imagine visiting a sleeping app that calls a sleeping Api for data).  

To conclude, React on Rails is a very fast and easy way to implement react into Rails, but if I need to do a serious project I would go with React + Rails Api.

### Redux
I develop this project with plain React first, then I refactored the project with Redux. Redux is not necessary for this project since the state tree is quite simple, but it's a good practice. 

If you want to look at the project without Redux, you can visit the this commit:

[Before Redux](https://github.com/ypan887/photo_gallery_react_on_rails/tree/20c5434e804de44fdf568d51b045076fc7271821)

#### Ajax in Redux
One problem I did encounter is doing Ajax upload with Redux. The recommended way is to use the fetch library. However, fetch does not support progress event. So, I used plain XHR object for Ajax uploading. For most part it works, but while I listening to the Ajax upload progress and dispatching actions to update the progress state, the action becomes undefined on some occation. I need to further investigate the issue.


### Demo
[without-Redux](http://photo-gallery-react.herokuapp.com/)

### Todo
- Add User authentication
- There is a long pending time for the  ajax upload request after I added the crop feature. Need to find out the reason for such a long pending
- Validate the uniqueness of image with MD5
- Add button to dispaly the original image
- After User upload image, update image data in props asynchronously

## Getting Started

To get a clone running on your local machine for development and testing purposes. You need this: 

#### Rails
cd to the project directory and install the gem, you will need ruby and rails setup on your machice
```
$ bundle install
```

#### Postgresql
You will also need to setup postgresql in your machine. You can find a good instruction [here](https://www.postgresql.org/download/)

If you are using figaro to manage your credentials like I did, put the following into `config/application.yml`

```
POSTGRES_USERNAME: Your postgresql username
POSTGRES_PASSWORD: Your postgresql password
```

#### AWS
You will need you own AWS credential or you can choose to store files on your own server

If you are using figaro to manage your credentials like I did, put the following into `config/application.yml`

```
S3_BUCKET_NAME:   your bucket directory
S3_KEY:           your aws key id
S3_SECRET:        your aws secret
S3_REGION:        your region of you bucket
```

#### React
Now we need to get all the client side code working. cd into the client folder.
Make sure you have node and npm installed.

```
$ npm -i
```

#### Start

To start the server, you will need to run
```
$ foreman start -f Procfile.dev
```

foreman will start both webpack and puma for you. You can now visit localhost:5000 to view the project.
