# BharatFD_assignment

# Project Setup and Installation Guide

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

## Installation Steps

### 1. Clone the Repository
```sh
git clone https://github.com/sujaylande/BharatFD_assignment
cd project
```

### 2. Setup the Backend (Server)
```sh
cd server
npm install
npm run dev  # Starts the server
```

### 3. Setup the Frontend (Client)
```sh
cd ../client
npm install
npm start  # Opens the website
```

## Environment Variables (.env file)
Create a `.env` file in the root of the `server` directory and add the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

## Running the Application
- **Server** will be running on `http://localhost:5000`
- **Client** will be running on `http://localhost:3000`

## Additional Notes
- Ensure MongoDB and Redis services are running before starting the server.
- Modify `.env` variables according to your setup.
- If any dependencies are missing, reinstall using `npm install`.

### Happy Coding! 🚀


## API Documentation

### Add FAQ

- **URL:** `/api/faqs`
- **Method:** `POST`
- **Input:**
  - `question` (String, required): The question to be added.
  - `answer` (String, required): The answer to the question.
- **Status Codes:**
  - `201 Created`: FAQ added successfully with translations.
  - `500 Internal Server Error`: Error occurred while adding the FAQ.
- **Response:**
  - **Success:**
    ```json
    {
      "message": "FAQ added successfully with translations!",
      "faq": {
        "_id": "faq_id",
        "question": "Your question",
        "answer": "Your answer",
        "translations": {
          "hi": {
            "question": "Translated question in Hindi",
            "answer": "Translated answer in Hindi"
          },
          "bn": {
            "question": "Translated question in Bengali",
            "answer": "Translated answer in Bengali"
          }
        },
        "createdAt": "timestamp"
      }
    }
    ```
  - **Error:**
    ```json
    {
      "error": "Error message"
    }
    ```

### Get FAQs

- **URL:** `/api/faqs`
- **Method:** `GET`
- **Query Parameters:**
  - [lang](String, optional): The language code for translations (default is `en`). Supported values are:
    - [en](/api/faqs): English
    - [hi](/api/faqs/?lang=hi): Hindi
    - [bn](/api/faqs/?lang=bn): Bengali
- **Status Codes:**
  - `200 OK`: FAQs retrieved successfully.
  - `500 Internal Server Error`: Error occurred while retrieving the FAQs.
- **Response:**
  - **Success (Cached):**
    ```json
    {
      "error": "Returning cached FAQs",
      "cachedFaqs": [
        {
          "question": "Cached question",
          "answer": "Cached answer"
        },
      ]
    }
    ```
  - **Success (From DB):**
    ```json
    {
      "error": "Returning FAQs from db",
      "translatedFaqs": [
        {
          "question": "Translated question",
          "answer": "Translated answer"
        },
      ]
    }
    ```
  - **Error:**
    ```json
    {
      "error": "Error message"
    }
    ```
### Happy Coding! 🚀


## Contribution Guidelines
We welcome contributions from the community! To contribute, follow these steps:

1. **Fork the repository** on GitHub.
2. **Clone your forked repository**:
   ```sh
   git clone https://github.com/sujaylande/BharatFD_assignment
   cd project
   ```
3. **Create a new branch** for your feature or bugfix:
   ```sh
   git checkout -b feature-branch
   ```
4. **Make your changes and commit**:
   ```sh
   git add .
   git commit -m "Add new feature"
   ```
5. **Push your changes to your fork**:
   ```sh
   git push origin feature-branch
   ```
6. **Open a Pull Request** to merge your changes into the main repository.

### Contribution Guidelines:
- Follow coding best practices and maintain code readability.
- Write clear commit messages.
- Ensure your changes do not break existing functionality.
- Add documentation/comments where necessary.
- If adding a new feature, include relevant tests.

### Happy Coding! 🚀
