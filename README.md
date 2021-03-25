# Translate App

With the **Translate App**, you can easily make your daily translations and listen the pronunciation of your
translations. It supports **20+ languages**.

## Purpose

There are many translation applications available nowadays, such as [Google Translate](https://translate.google.com),
[Yandex Translate](https://translate.yandex.com/) and [Bing Translator](https://www.bing.com/translator). This project
has been developed using many technologies. The main purpose of developing this application is to show how we can use
these technologies together with a sample project.

**Note:** It was a project that I had started while teaching vue.js to my teammates. Afterwards, I tried to complete the
project by making improvements in my free time.

## Limitations

There are some limitations for lower AWS billing.

1. Translations are limited to 100 characters.
2. Translations are not translated as soon as you write. You have to use translation button.

## Features

1. Translation with 20+ languages
2. Pronunciation of translations
3. User login/register features
4. Authenticated users can view translation history

## Technologies

This project has been developed using many technologies. I want to explain all of these by grouping.

**1. Frontend**

- [Vue.js](https://vuejs.org): Frontend Framework
- [Vuex](https://vuex.vuejs.org): State Management
- [Vuetify](https://vuetifyjs.com/en/): UI Library
- [Firebase Web Client](https://www.npmjs.com/package/firebase): to communicate with the backend

**2. Backend: Firebase**

- [Firebase Hosting](https://firebase.google.com/products/hosting): The web client application is deployed to firebase
  hosting.
- [Firebase Authentication](https://firebase.google.com/products/auth): Authentication solution for the app.
- [Firebase Firestore](https://firebase.google.com/products/firestore): Main database for the app. We store all
  translations and translation history of authenticated users.
- [Firebase Functions](https://firebase.google.com/products/functions): Serverless api solution for the app.

**3. Backend: AWS**

- [AWS Translate](https://aws.amazon.com/translate): Translate solution
- [AWS Polly](https://aws.amazon.com/polly): Text to Speech solution

## Contribution

Your contribution to the project will make me very happy. You can develop for issues with the **help wanted** tag. You
can also create issues for bugs or new ideas.

## License

**Translate App** is licensed under the **GNU General Public License v3.0**
