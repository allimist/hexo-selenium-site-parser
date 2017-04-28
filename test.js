var Parser = require('hexo-selenium-site-parser');
var parser = new Parser();

var sites_config = [];

// sites_config[0] = [];
// sites_config[0]['site_url'] = 'https://torrent2games.net/'; //http://kanna-biz.info/news/2
// sites_config[0]['records_links_xpath'] = "//div[@class='moduletable_content']//h4//a";
// sites_config[0]['records_title_xpath'] = "//div[@class='itemHeader']//h1";
// sites_config[0]['records_content_xpath'] = "//div[@class='itemFullText']";
// sites_config[0]['records_img_xpath'] = '//div[@class="k2itemColumn"]//img'; //leave it empty if use many images at the same page  "//div[@class='full-str']//img"; 
// sites_config[0]['records_imgs_xpath'] = '//a//img'; //leave it empty if use only one image
// sites_config[0]['records_meta1_xpath'] = '';//"//div[@class='tile-primary']//textarea";
// sites_config[0]['offset_of_movies_to_parse'] = 0;
// sites_config[0]['num_of_movies_to_parse'] = 5;
// sites_config[0]['allow_owerite'] = 1; //  0 = not rewrite /important not remove

// work
sites_config[1] = [];
sites_config[1]['site_url'] = 'http://thepcgames.net/'; http://growerland.info/page/2/
sites_config[1]['records_links_xpath'] = "//header[@class='entry-header']/h1/a";
sites_config[1]['records_title_xpath'] = "//header[@class='entry-header']//h1";
sites_config[1]['records_content_xpath'] = '//div[@class="entry-content"]';
sites_config[1]['records_img_xpath'] = '//div[@class="entry-content"]//p//img'; //leave it empty if use many images at the same page  "//div[@class='full-str']//img"; 
sites_config[1]['records_imgs_xpath'] = '//div[@class="entry-content"]//p//img'; //leave it empty if use only one image
sites_config[1]['records_meta1_xpath'] = '';//"//div[@class='tile-primary']//textarea";
sites_config[1]['offset_of_movies_to_parse'] = 0;
sites_config[1]['num_of_movies_to_parse'] = 10;
sites_config[1]['records_imgs_to_parse'] = 4; // num on images to parse per parsed post
sites_config[1]['allow_owerite'] = 1; //  0 = not rewrite /important not remove


// sites_config[1] = [];
// sites_config[1]['site_url'] = 'http://grower.ink/'; //
// sites_config[1]['records_links_xpath'] = "//h2[@class='ipsType_pageTitle']/a";
// sites_config[1]['records_title_xpath'] = "//div[@class='ipsClearfix']//h1";
// sites_config[1]['records_content_xpath'] = '//section[@class="ipsType_richText ipsType_normal"]/p';
// sites_config[1]['records_img_xpath'] = '//div[@class="cCmsRecord_image"]//img'; //leave it empty if use many images at the same page  "//div[@class='full-str']//img"; 
// sites_config[1]['records_imgs_xpath'] = ''; //leave it empty if use only one image
// sites_config[1]['records_meta1_xpath'] = '';//"//div[@class='tile-primary']//textarea";
// sites_config[1]['offset_of_movies_to_parse'] = 18;
// sites_config[1]['num_of_movies_to_parse'] = 20;
// sites_config[1]['allow_owerite'] = 0; //  0 = not rewrite /important not remove





parser.parse(sites_config);