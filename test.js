var Parser = require('hexo-selenium-site-parser');
var parser = new Parser();

var sites_config = [];


sites_config[1] = [];
sites_config[1]['site_url'] = 'http://seasonvar.ru/'; 
sites_config[1]['records_links_xpath'] = "//div[@class='news']//a";
sites_config[1]['records_title_xpath'] = "//h1[@class='pgs-sinfo-title']";
sites_config[1]['records_content_xpath'] = "//div[@class='pgs-sinfo-info']//p";
sites_config[1]['records_img_xpath'] = "//div[@class='pgs-sinfo-imgwrap']//span//img"; //leave it empty if use many images at the same page  "//div[@class='full-str']//img"; 
sites_config[1]['categories_xpath'] = '';
sites_config[1]['tags_xpath'] = '';
sites_config[1]['records_imgs_xpath'] = '';////div[@class="entry-content"]//p//img'; //leave it empty if use only one image
sites_config[1]['records_imgs_to_parse'] = 0; // num on images to parse per parsed post
sites_config[1]['records_meta1_xpath'] = '';//"//div[@class='tile-primary']//textarea";

sites_config[1]['click'] = "//div[@class='player-extBtn-getcode']";//"//div[@class='tile-primary']//textarea";
sites_config[1]['click_and_get'] = "//div[@id='svmodal-in']";//"//div[@class='tile-primary']//textarea";

sites_config[1]['offset_of_pages_to_parse'] = 0;
sites_config[1]['num_of_pages_to_parse'] = 100;
sites_config[1]['records_translit_title_letters_to_english'] = 0; 
sites_config[1]['allow_owerite'] = 1; //  0 = not rewrite /important not remove

parser.parse(sites_config);