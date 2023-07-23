<template>
    <div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="20000"
        controls
        indicators
        background="#ababab"
        img-width="600"
        img-height="400"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          class="custom-slide1"  
          caption="About Us" 
          img-src="https://www.inn.co.il/static/pictures/781x439/1038337.jpg">
          <div class="slide-text">
                Welcome to Daniel and Itay's recipes site!<br>
                Our names are Daniel Kazakov and Itay Paikin and we are students in the Department of Software and Information Systems Engineering at Ben Gurion University.
                As part of our journey during the first degree we took the course Web Development Environments. 
                During the semester we learned and acquired a variety of tools for web development such as: HTML, JS, Express, Node.js, vue.js and more which we applied in the development of this website.
                On this about page you can get an impression and take a look at some of the different exercises we did throughout the course.<br>
                Hope you enjoy!
          </div>
        </b-carousel-slide>
  
        <!-- Slides with custom text -->
        <b-carousel-slide img-src="https://cdn.educba.com/academy/wp-content/uploads/2020/07/psd-9-9-5-3.jpg.webp">
          <div class="slide-text2"><h5>We started by building static websites for some familiar characters we all know.</h5></div>
        </b-carousel-slide>
  
        <!-- Slides with image only -->
        <b-carousel-slide class = "custom-slide3">
            <template #img>
                <img
                src="https://img.informer.com/screenshots/74/74342_3.png"
                width="800"
                height="450">
            </template>
            <div class="slide-text3"><h5>Then we developed our chicken's revenge game that combines HTML 5 with extensive use of canvas
                                         and additional JS features such as event loop and asynchronous functions.</h5></div>
        </b-carousel-slide>
  
        <b-carousel-slide class = "custom-slide4">
            <template #img>
                <img
                src="https://thefloppydisk.files.wordpress.com/2013/05/web20.png"
                width="800"
                height="450">
            </template> 
          <div class="slide-text4"><h5>As part of the final project we defined the API for our recipies site
                                     and implemented the server side accordingly.</h5></div>
        </b-carousel-slide>

        <b-carousel-slide class = "custom-slide5">
            <template #img>
                <img
                src="https://b2b-im.com/wp-content/uploads/2017/09/AdobeStock_135984800-5668x2834.jpeg"
                width="800"
                height="450">
            </template> 
          <div class="slide-text5"><h5>And finally we implemented the client side as well
                                      and we reached the end of our full stack project and the result is in front of you.</h5></div>
        </b-carousel-slide>
      </b-carousel>
      
      <br>
      <h3 class="text-center">Links to our previous assignments in the course</h3>
      <br>

      <div class="links align-items-center">
        <b-list-group>  
            <b-list-group-item><a class="links" href="https://web-development-environments-2023.github.io/320569650/" target=”_blank”>Assignment 1 - Daniel's website</a></b-list-group-item>
            <b-list-group-item><a class="links" href="https://web-development-environments-2023.github.io/316424365/" target=”_blank”>Assignment 1 - Itay's website</a></b-list-group-item>
            <b-list-group-item><a class="links" href="https://web-development-environments-2023.github.io/assignment2-320569650_316424365/" target=”_blank”>Assignment 2 - Daniel and Itay's popular Chickens Revenge game</a></b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          slide: 0,
          sliding: null
        }
      },
      methods: {
        onSlideStart(slide) {
          this.sliding = true
        },
        onSlideEnd(slide) {
          this.sliding = false
        }
      }
    }
  </script>

  <style lang="scss" scoped>
    #carousel-1 {
        max-width: 800px;
        max-height: 800px;
        margin: 0 auto;
        font-weight: bold;
    }
    
    .b-carousel-slide img {
        max-width: 100%;
        height: auto;
    }

    .links-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .links {
        color: darkslategrey;
        font-weight: 900;
        font-family: "Courier New", Courier, monospace;
        text-align: center; 
    }

    h3 {
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        font-weight: bold;
    }


    .custom-slide1 .slide-text {
        text-align: center;
        margin-bottom: 15%;
        width: 100%;  
        font-size: 18px; 
        color: whitesmoke; 
        line-height: 1.4; 
        font-weight: bold;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        -webkit-text-stroke: 0.8px black;
         
    }

    .slide-text2 {
        margin-right: 65%;
        text-align:left;
        color: whitesmoke;
        font-weight: bold;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
   
    .slide-text3 {
        margin-right: 55%;
        text-align:left;
        color: whitesmoke;
        font-weight: bold;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    .custom-slide4 .slide-text4 {
        margin-right: 35%;
        font-size: 12px;
        color: darkblue;
        font-weight: bold;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    .slide-text5 {
        margin-right: 65%;
        text-align:left;
        color: whitesmoke;
        font-weight: bold;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    

  </style>