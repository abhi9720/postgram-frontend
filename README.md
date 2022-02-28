
# Postgram- A social Networking hub

This is an **social** - networking app with lot of functionality like  sharing post , adding new friend, follow other users , do realtime chat chat with your friends.
Looks Excited right , just click on link below and create your account and join these amazing peoples.


---

## Live Demo [Postgram](https://postgram-social.netlify.app/)
 **Homepage**
![postgram-social netlify app_(Nest Hub Max)](https://user-images.githubusercontent.com/68281476/155942469-8ea2d779-cdd7-470e-a0e6-31cec35832d7.png) 

----
 **Profile** 
|      |     |       |
| ------------- | --------------- | -------------------- |
| ![image](https://assets.leetcode.com/users/images/e7220227-f7ad-4d1b-a6e0-51b364866e34_1646033006.3632839.png) |   ![connection](https://user-images.githubusercontent.com/68281476/155944260-b945e0f6-8985-4330-8864-8ec3fa02a3e8.png)
 |

---
**MESSENGER**
|     |        |       |
| ------------- | --------------- | -------------------- |
| ![messenger](https://user-images.githubusercontent.com/68281476/155943176-2a60914c-0c91-4772-b01c-de3ed59b1a4a.png)     | ![chat](https://user-images.githubusercontent.com/68281476/155943297-ec0088c7-f0d0-4fda-8ce0-564ed1486d18.png)         | 

 




### Functionality and Features

- Simple login and signup
- Adding new post
- Follow other user
- Like a post
- Delete a post
- Sending Friend Request using socket.io - accept or reject both
- Realtime chat application
- Creative profile page of user to manage your follower and following , and friend
- Upload profile picture and Cover image for profile page
- Easily Search other user , follow or send request
- **Awesome UI for laptop and Mobile**

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
