README.md


# hexo-selenium-site-parser

## first:
npm install hexo-selenium-site-parser

## use example:

this file should located in hexo blog folder because it create posts in source/_post and source/images folders

var Parser = require('hexo-selenium-site-parser'); | var Parser = require('./node_modules/hexo-selenium-site-parser/hexo-selenium-site-parser.js');
var parser = new Parser();

var sites_config = [];

sites_config[0] = [];
sites_config[0]['site_url'] = 'http://inosmi.info/';
sites_config[0]['records_links_xpath'] = "//div[@class='index_page']//div//div/*[not(self::span)]//a";
sites_config[0]['records_title_xpath'] = "//td[@class='content']//h1";
sites_config[0]['records_content_xpath'] = "//div[@class='page_content']";
sites_config[0]['records_img_xpath'] = "//div[@class='page_content']//img";
sites_config[0]['offset_of_movies_to_parse'] = 0;
sites_config[0]['num_of_movies_to_parse'] = 2;
sites_config[0]['allow_owerite'] = 0; //  0 = not rewrite /important not remove

sites_config[1] = [];
sites_config[1]['site_url'] = 'https://www.msn.com/ru-ru/news';
sites_config[1]['records_links_xpath'] = "//div[@class='today1 mediuminfopanehero layout-large']//li//a";
sites_config[1]['records_title_xpath'] = "//header[@class='collection-headline']//h1";
sites_config[1]['records_content_xpath'] = "//section[@class='articlebody']";
sites_config[1]['records_img_xpath'] = "//section[@class='articlebody']//img";
sites_config[1]['offset_of_movies_to_parse'] = 2;
sites_config[1]['num_of_movies_to_parse'] = 4;
sites_config[1]['allow_owerite'] = 0; //  0 = not rewrite /important not remove

sites_config[2] = [];
sites_config[2]['site_url'] = 'https://regnum.ru/';
sites_config[2]['records_links_xpath'] = "//div[@class='analytics-container']//a";
sites_config[2]['records_title_xpath'] = "//div[@class='news-detail-wrapper']//h1";
sites_config[2]['records_content_xpath'] = "//div[@class='news_body']";
sites_config[2]['records_img_xpath'] = "//div[@class='detail-main-picture-wrapper']//img";
sites_config[2]['offset_of_movies_to_parse'] = 4;
sites_config[2]['num_of_movies_to_parse'] = 6;
sites_config[2]['allow_owerite'] = 0; //  0 = not rewrite /important not remove


// parser.parse(sites_config[1]);
parser.parse(sites_config);