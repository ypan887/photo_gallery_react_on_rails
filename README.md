# Introduction

This is an react on rails project. First, I followed this react tutorial repo but rewrite the code in ES6. Then I expended the project with upload components and refactor the structure. Up until this commit, the client side code structure still looks very much like the original one. I refactored following the container and presentational pattern.

## Features

### Todo
- Add User authentication
- Sever responding to ajax upload request is slow after I added the crop feature, there should be room for improvements
- Add button to dispaly the original image
- Although this is a simple project, but may be I can use it to learn redux? Just a thought, yet.

I deployed a demo and upload all my babys pictures and they looks great as a gift.


### React on Rails
The app use redis as cache store. All current day’s posts fed from Api are stored in cache and are set to expire in 20 mins. This way, User can get new posts from server without sending out too many requests.

### Demo


#Getting Started

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
