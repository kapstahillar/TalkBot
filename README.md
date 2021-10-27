<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![MIT License][license-shield]][license-url]




<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![screenshot1]

<p>
This is highly scalable TalkBot that allows user to input questions or commands and bot returns back </br>
command result.</br> 
Scalable part is because it uses plugins to add functionality to it and command execution is </br> interfaced with async commands, so it does not matter if command logic happens in only client </br>side or command needs to execute functions with remote API 
</p>

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With


* [React.js](https://reactjs.org/)
* [Laravel](https://laravel.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

Note: php.ini has to have extension=fileinfo enabled for project to work.

* install composer using php
  ```sh
  php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
  ```
  
*  download and install npm from: https://nodejs.org/en/download/ 

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/kapstahillar/TalkBot.git
    ```
2. Change directory to TalkBot
   ```sh
   cd ./TalkBot
   ```
3. Install composer packages
   ```
   composer install
   ```
4. Install npm packages
   ```
   npm install
   ```
5. Run webmix
   ```
   npm run watch
   ```
6. Rename file .env.example to .env
7. Generate new application key 
   ```
   php artisan key:generate
   ```
8. Run development server 
   ```
   php artisan serve
   ```
9. Open up brower and open localhost:8000

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Add Talkbot to your frontend with tag:
``` 
<TalkBot/>  
```

Usage in example:

This bot should talk, but it doesn't do it currently.
This bot only know's 2 commands /calculate and /convert

``` 
/calculate 
```
calculate takes in 1 parameters in format \<number>\<+-*/>\<number> and returns result of calculation

Example: 

``` 
/calculate 1*2
/calculate 4.23+1.3 
```
 
``` 
/convert 
```
calculate takes in 3 parameters. First parameters have to be \<number> and other 2 two are currency tag strings like EUR or USD

Example: 

``` 
/convert 23141 EUR 
/convert 300 AUD USD
```

<!-- CONTACT -->
## Issues

Convert request might fail on localhost because of SSL Certificate.
Below is a guide how to fix this

1. Go to https://curl.se/docs/caextract.html and download cacert.pem
2. Put is somewhere where php can access it. I used C://xampp in my windows build
3. Add those two lines to you php.ini file (Do know what PHP you are using use: php --ini)
``` 
curl.cainfo = C:\php-8.0.12\cacert.pem
openssl.cafile= C:\php-8.0.12\cacert.pem
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[screenshot1]: https://imgur.com/a/iQF7MKi