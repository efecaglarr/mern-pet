# Full Stack Pet Adoption App 

This project is created for my full stack web development journey. With this app you can register and login to the Pet Adoption App and create new posts can manage your posts and like other's posts. That was my first full stack project so I tried to learn concepts of MERN Stack development. 

## Technologies

- Frontend: React, Redux, Material UI
- Backend: Node, Express
- For Authentication: Json Web Token

## How it works
The platform allows users to create, read, update, and delete pet posts, which include information about pets available for adoption. Each pet post contains comprehensive information about the pet, including:
- `Title`: A descriptive title for the pet post.
- `Message`: Additional details about the pet, such as its breed, age, temperament, and any special needs.
- `Selected Image File`: An image representing the pet, aiding in visual identification and appeal.
- `Creation Date`: The date when the pet post was created, providing a timeline of pet availability.
- `Description`: Further information about the pet's personality, habits, and compatibility with potential adopters.
- `Location`: The geographical location of the pet, facilitating local adoptions and community engagement.
- `Comments`: Feedback and inquiries from other users interested in adopting the pet, fostering community interaction and support.

## Data Structures


## Functions
- `getPosts`: Retrieves all pet posts available on the platform.
- `createPost`: Creates a new pet post with the provided information.
- `readPost`: Retrieves the details of a specific pet post based on its ID.
- `update`: Updates the information of an existing pet post. This function can also be utilized to add comments to a pet post. After retrieving the existing pet post using its ID, you can update its information, including adding new comments. If you want to add a comment, you can pass the updated pet post with the new comment added to the update function. The platform will then replace the existing pet post with the updated one, effectively adding the new comment to the post.
- `delete`: Deletes a pet post from the platform.

## Contribution
This project expects contributions from developers familiar with technologies like React, Motoko and Rust. Those who wish to contribute can clone the project, make enhancements, and submit pull requests.

## Installation

## UI
