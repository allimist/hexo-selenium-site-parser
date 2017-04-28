README.md


# hexo-selenium-site-parser

## first:
npm install hexo-selenium-site-parser

## second:
create teampleate file called: 'teamplate_record.md' you can copy in from module directory
```
---
title: [[title]]
---

[[img]]

[[desc]]

[[imgs]]

[link:]([[link]] "[[title]]")

```

## use example:

* create file test.js in hexo blog folder because it create posts in source/_post and store images in source/images folders put next code to see the result
* check everyone can write permision to '/source' folder
* you can copy test.js from module directory

```javascript
var Parser = require('hexo-selenium-site-parser');
var parser = new Parser();

var sites_config = [];

sites_config[0] = [];
sites_config[0]['site_url'] = 'http://thepcgames.net/'; http://growerland.info/page/2/
sites_config[0]['records_links_xpath'] = "//header[@class='entry-header']/h1/a";
sites_config[0]['records_title_xpath'] = "//header[@class='entry-header']//h1";
sites_config[0]['records_content_xpath'] = '//div[@class="entry-content"]';
sites_config[0]['records_img_xpath'] = '//div[@class="entry-content"]//p//img'; //leave it empty if use many images at the same page
sites_config[0]['records_imgs_xpath'] = '//div[@class="entry-content"]//p//img'; //leave it empty if use only one image
sites_config[0]['records_meta1_xpath'] = '';//"//div[@class='tile-primary']//textarea";
sites_config[0]['offset_of_movies_to_parse'] = 0;
sites_config[0]['num_of_movies_to_parse'] = 10;
sites_config[0]['records_imgs_to_parse'] = 4; // num on images to parse per parsed post
sites_config[0]['allow_owerite'] = 1; //  0 = not rewrite /important not remove



parser.parse(sites_config);
```
