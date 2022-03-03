# Postgram


![logo](https://user-images.githubusercontent.com/68281476/156367921-605d871b-ea47-4f2b-b8ff-f8667b2e1d46.png)







This is an **social** - networking app with lot of functionality like  sharing post , adding new friend, follow other users , do realtime chat  with your friends.
Looks Excited right , just click on link below and create your account and join these amazing peoples.


---

## Live Demo [Postgram](https://postgram-social.netlify.app/)

 ### Homepage
 |      |
| ------------- |  
 |![postgram-social netlify app_(Nest Hub Max)](https://user-images.githubusercontent.com/68281476/156540884-28aafaeb-8b79-43cf-91f6-7a2b07bc5d5d.png)|


----
 ### Profile
|      |
| ------------- |  
| ![profile](https://user-images.githubusercontent.com/68281476/156541815-78092acf-cf20-4a46-8a74-4a2f1a0040cd.png)
  

---
### MESSENGER
|     |       
| ------------- |
| ![155943297-ec0088c7-f0d0-4fda-8ce0-564ed1486d18](https://user-images.githubusercontent.com/68281476/156542506-0dc398d0-7fb4-484a-bf4b-f77bf3ca44d6.png)


 

### Mobile Responsive 

 ![mobile view2](https://user-images.githubusercontent.com/68281476/156369580-0929ec18-8ab5-4f22-a576-8266c4767355.png)


### Functionality and Features

- Simple login and signup
- Adding new post
- Infinite Scroll
- Follow other user
- Like a post or Delete a post
- Sending Friend Request using socket.io - accept or reject both
- Realtime chat application
- Creative profile page of user to manage your follower and following , and friend
- Upload profile picture and Cover image for profile page
- Easily Search other user , follow or send request
- **Awesome UI and Responsive For Mobile**

## **Technology & library Used**

| Nodejs        | Express         | Mongodb              |
| ------------- | --------------- | -------------------- |
| **Reactjs**   | **Socket.io**   | **mongoose**         |
| **Multer**    | **cloudinary**  | **morgan**           |
| **bootstrap** | **react-alert** | **socket.io-client** |
| **Netlify**     | **Heroku**      | **Material UI**      |

## RUN IT LOCALLY

- Install `Nodejs` and `Reactjs` to your local machine
- Create account on cloudinary and mongodb and get credentials
- Set up all these keys by creating .env file for nodejs server

`MONGO_URL =`

`CLOUDINARY_CLOUD_NAME =`

`CLOUDINARY_KEY =`

`CLOUDINARY_SECRET =`

- And in Client folder setup .env file and add these variables to it

`REACT_APP_PUBLIC_FOLDER = ./assets/`

`REACT_APP_End_Point = http://localhost:8800/` or any port 

- And Finally , run `cd .\server\` then `npm start`
---
> **Backend Code - ** https://github.com/abhi9720/postgram-server
