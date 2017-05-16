

function Parser() {
    
}

Parser.prototype.parse = function(sites_config) {



    var forEach = require('async-foreach').forEach;
    var fs = require('fs');
    var request = require('request'), fs2      = require('fs');
    var translit = require('translitit-cyrillic-russian-to-latin');
    var mkdirp = require('mkdirp');


    var webdriver = require('selenium-webdriver');
    var By = webdriver.By;
    var until = webdriver.until;
    var chrome = require('selenium-webdriver/chrome');
    var path = require('chromedriver').path;

    var service = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(service);

    var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();



    function parse_site(site_config){


        //var site_url = site_config['site_url'];
        //var records_links_xpath = site_config['records_links_xpath'];
        //var records_title_xpath = site_config['records_title_xpath'];
        //var records_content_xpath = site_config['records_content_xpath'];
        //var records_img_xpath = site_config['records_img_xpath'];
        //var records_imgs_xpath = site_config['records_imgs_xpath']; 
        //var records_meta1_xpath = site_config['records_meta1_xpath'];
        //var offset_of_movies_to_parse = site_config['offset_of_movies_to_parse'];
        //var num_of_movies_to_parse = site_config['num_of_movies_to_parse'];
        //var records_imgs_to_parse = site_config['records_imgs_to_parse'];
        //var link_to_source_page = site_config['link_to_source_page'];
        //var allow_owerite = site_config['allow_owerite']; //  0 = not rewrite /important not remove
        //var records_translit_title_letters_to_english = site_config['records_translit_title_letters_to_english'];

        var links = [];
        var data = [];

        function get_links(links,callback){

            //console.log('data parsed');
            //console.log('data parsed',links);
            driver.get(site_config['site_url']); 
            driver.findElements(By.xpath(site_config['records_links_xpath'])).then(function(newsElems) {
            
                newsElems.forEach(function(newsElem) {

                    // console.log(i);
                    
                    // newsElem.getText().then(function(body_text){
                    //  console.log(body_text);
                    // });

                    newsElem.getAttribute("href").then(function(body_text){
                        //console.log(body_text);
                        links.push(body_text);
                        
                    });

                });


            }).then(function(){
                    console.log('page: ',site_config['site_url'],' links parsed: ',links.length);
                    callback(links);
            });

        };


        function parse_record(data, index, item, callback){

            //function(){}

                console.log("-", index, item);

                //console.log(uniqueLinks[index]);

                data[index] = [];
                data[index]['link'] = item;//uniqueLinks[index];

                driver.get(item);

                driver.findElement(By.xpath(site_config['records_title_xpath'])).then(function(checkElem) {
                    checkElem.getText().then(function(body_text){
                        //console.log('title',body_text);
                        data[index]['title'] = body_text;
                        callback(data[index],index);
                    });
                });

                driver.findElement(By.xpath(site_config['records_content_xpath'])).then(function(checkElem) {
                    checkElem.getText().then(function(body_text){
                        //console.log('desc',body_text);
                        data[index]['desc'] = body_text;
                        callback(data[index],index);
                    });
                });

                if(site_config['records_img_xpath']!=''){

                    //parse image only if exist
                    driver.wait(until.elementLocated(By.xpath(site_config['records_img_xpath'])), 5000).then(function(checkElem) {
                        //console.log('----yes');
                        checkElem.getAttribute("src").then(function(body_text){
                            data[index]['img'] = body_text;
                            callback(data[index],index);
                        });
                    }).catch(function(ex) {
                        console.log('-- no image for post',index);
                        data[index]['img'] = '';
                        callback(data[index],index);

                    });

                }

                //driver.wait(until.titleIs('webdriver - Google Search'), 1000);


                if(site_config['records_meta1_xpath']!=''){

                    driver.findElement(By.xpath(site_config['records_meta1_xpath'])).then(function(checkElem) {
                        checkElem.getText().then(function(body_text){
                            console.log('meta1',body_text);
                            data[index]['meta1'] = body_text;
                            callback(data[index],index);
                        });
                    });

                }

                if(site_config['records_imgs_xpath']!=''){

                    var images = [];

                    driver.findElements(By.xpath(site_config['records_imgs_xpath'])).then(function(checkElems) {
                        
                        

                        checkElems.forEach(function(checkElem) {

                            checkElem.getAttribute("src").then(function(body_text){
                                images.push(body_text);
                            });

                        });


                    }).then(function(){

                        data[index]['imgs'] = images;
                        callback(data[index],index);

                    });

                }

                
                if(site_config['categories_xpath']!=''){

                    driver.findElement(By.xpath(site_config['categories_xpath'])).then(function(checkElem) {
                        checkElem.getText().then(function(body_text){
                            //console.log('title',body_text);
                            data[index]['categories'] = body_text;
                            callback(data[index],index);
                        });
                    });

                    

                }
                if(site_config['tags_xpath']!=''){

                    driver.findElement(By.xpath(site_config['tags_xpath'])).then(function(checkElem) {
                        checkElem.getText().then(function(body_text){
                            //console.log('title',body_text);
                            data[index]['tags'] = body_text;
                            callback(data[index],index);
                        });
                    });

                    

                }
                if(site_config['click']!=''){
                    driver.wait(until.elementLocated(By.xpath(site_config['click'])), 5000).then(function(checkElem) {
                        checkElem.click();
                        driver.findElement(By.xpath(site_config['click_and_get'])).then(function(checkElem) {
                            checkElem.getText().then(function(body_text){
                                //console.log('title',body_text);
                                data[index]['click_and_get'] = body_text;
                                callback(data[index],index);
                            });
                        });
                    }).catch(function(ex) {
                        console.log('-- no click for post',index);
                        data[index]['click_and_get'] = '';
                        callback(data[index],index);

                    });
                }

                

        };


        function store_record(record,index){

            if (typeof record['title'] == 'undefined' || record['title'] == null){
              //console.log('-no title');
            } else if (typeof record['desc'] == 'undefined' || record['desc'] == null){
               //console.log('-no desc');
            } else if (site_config['records_img_xpath'] != '' && (typeof record['img'] == 'undefined' || record['img'] == null)){
               //console.log('-no img');
            } else if (site_config['records_meta1_xpath'] != '' && (typeof record['meta1'] == 'undefined' || record['meta1'] == null)){
               //console.log('-no iframe');
            } else if (site_config['records_imgs_xpath'] != '' && (typeof record['imgs'] == 'undefined' || record['imgs'] == null)){
               //console.log('-no iframe');
            } else if (site_config['categories_xpath'] != '' && (typeof record['categories'] == 'undefined' || record['categories'] == null)){
               //console.log('-no iframe');
            } else if (site_config['tags_xpath'] != '' && (typeof record['tags'] == 'undefined' || record['tags'] == null)){
               //console.log('-no iframe');
            } else if (site_config['click'] != '' && (typeof record['click_and_get'] == 'undefined' || record['click_and_get'] == null)){
               //console.log('-no iframe');
            } else {
                
                //console.log('+yes title,desc,img,iframe');

                //store page


                record['title'] = record['title'].replace(/:/g,'-');
                var post_name = record['title'].replace(/\s/g, '_');
                post_name = post_name.replace(/—/g, '_');
                post_name = post_name.replace(/\//g, '_');
                post_name = post_name.replace(/«/g, '_');
                post_name = post_name.replace(/»/g, '_');
                post_name = post_name.replace(/,/g, '_');
                post_name = post_name.replace(/\?/g, '_');
                post_name = post_name.replace(/\./g, '_');
                post_name = post_name.replace(/\!/g, '_');
                post_name = post_name.replace(/\(/g, '_');
                post_name = post_name.replace(/\)/g, '_');
                post_name = post_name.replace(/\"/g, '_');
                post_name = post_name.replace(/\'/g, '_');
                post_name = post_name.replace(/\]/g, '_');
                post_name = post_name.replace(/\[/g, '_');
                post_name = post_name.replace(/\|/g, '_');
                post_name = post_name.replace(/&/g, '_');
                post_name = post_name.replace(/-/g, '_');
                post_name = post_name.replace(/__/g, '_');
                //value = value.replace(/(^[\s]+|[\s]+$)/g, '');

                if(site_config['records_translit_title_letters_to_english']){
                    post_name = translit(post_name);
                }


                

                //console.log(post_name);

                //first chatck if exist and if allow owerite
                

                if (!site_config['allow_owerite'] && fs2.existsSync('source/_posts/'+post_name+'.md')) {
                    // Do something
                    console.log('- '+index+' file exist - owerite disabled',post_name);


                } else {

                    //creta page in hexo

                    filename = 'teamplate_record.md';
                    fs.readFile(filename, 'utf8', function(err, data) {
                      
                        if (err) throw err;
                        //console.log('OK: ' + filename);
                        data = data.replace(/\[\[title\]\]/g, record['title']);
                        data = data.replace('[[desc]]', record['desc']);

                        if(site_config['records_meta1_xpath']!=''){
                            data = data.replace(/\[\[meta1\]\]/g, record['meta1']);
                        }

                        //store image if exist
                        if(site_config['records_img_xpath'] != '' && record['img']!=''){


                            if(site_config['records_translit_title_letters_to_english']==0){
                                img_file_name = translit(post_name);
                            } else {
                                img_file_name = post_name;
                            }
                            data = data.replace('[[img]]', '!['+record['title']+'](/images/'+img_file_name+'.jpeg "'+record['title']+'")');

                            request(record['img']).pipe(fs2.createWriteStream('source/images/'+img_file_name+'.jpeg'));
                        } else{
                            data = data.replace('[[img]]', '');
                        }


                        //store images ???
                        if(site_config['records_imgs_xpath'] != '' && record['imgs'].length>0){

                                if (!fs.existsSync('source/images/'+post_name)){
                                    fs.mkdirSync('source/images/'+post_name);
                                }


                                imgs = '';
                                img_index=0;
                                record['imgs'].forEach(function(checkElem) {

                                    if(img_index>site_config['records_imgs_to_parse']){
                                        return;
                                    }

                                    imgs += '!['+record['title']+'](/images/'+post_name+'/'+img_index+'.jpeg "'+record['title']+'")';
                                    console.log('soring image',img_index);
                                    request(checkElem).pipe(fs2.createWriteStream('source/images/'+post_name+'/'+img_index+'.jpeg'));
                                    img_index++;



                                });

                                data = data.replace('[[imgs]]', imgs);   
                            
                        } else{
                            data = data.replace('[[imgs]]', '');
                        }

                        if(site_config['categories_xpath'] != '' && record['categories'].length>0){

                            
                            // console.log(record['tags']);
                            var records = record['categories'].split(': ');
                            // console.log(records);
                            records = records[1];
                            // console.log(records);
                            records = records.split(',');
                            // console.log(records);

                            var records_up = [];
                            records.forEach(function(value){

                                value = value.replace(/(^[\s]+|[\s]+$)/g, '');
                                records_up.push('- '+value+'\n');


                            });
                            // console.log(records_up);
                            records_up = records_up.join('');
                            // console.log(records_up);




                            data = data.replace('[[categories]]', records_up); 

                            
                        } else{
                            data = data.replace('[[categories]]', '');
                        }

                        if(site_config['tags_xpath'] != '' && record['tags'].length>0){

                            
                            // console.log(record['tags']);
                            var records = record['tags'].split(': ');
                            // console.log(records);
                            records = records[1];
                            // console.log(records);
                            records = records.split(',');
                            // console.log(records);

                            var records_up = [];
                            records.forEach(function(value){

                                value = value.replace(/(^[\s]+|[\s]+$)/g, '');
                                records_up.push('- '+value+'\n');


                            });
                            // console.log(records_up);
                            records_up = records_up.join('');
                            // console.log(records_up);




                            data = data.replace('[[tags]]', records_up); 

                            
                        } else{
                            data = data.replace('[[tags]]', '');
                        }




                        //store image if exist
                        if(site_config['click'] != '' && record['click_and_get']!=''){
                            data = data.replace('[[click_and_get]]', record['click_and_get']);
                        } else{
                            data = data.replace('[[click_and_get]]', '');
                        }




                        if(site_config['link_to_source_page']){
                            data = data.replace(/\[\[link\]\]/g, record['link']);
                        }


                        //console.log('images in the page:',record['imgs']);
                        
                        //store post in post folder in md lang
                        //console.log(data);
                        fs.writeFile('source/_posts/'+post_name+'.md', data, function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            //console.log(post_name+'.md '+"The file was saved!");
                            console.log('-'+index+' file saved',post_name+'.md ');
                        }); 



                    });
                }
                
            }

        };


        function data_loop(){

            //console.log('data callback');
            //console.log(links);
            //console.log('links.length',links.length);

            var uniqueLinks = [];

            links.forEach(function(el){
                if(uniqueLinks.indexOf(el) === -1) uniqueLinks.push(el);
            });

            //console.log(uniqueLinks);
            console.log('uniqueLinks.length',uniqueLinks.length);

            //function callback () { console.log('all done'); }

            //var itemsProcessed = 0;

            forEach(uniqueLinks, function(item, index, arr) {
              //console.log("each", item, index, arr);

                
                if(index<site_config['offset_of_pages_to_parse']){
                    return;
                }

                if(index>=site_config['num_of_pages_to_parse']){
                    return;
                }

                parse_record(data, index, item, store_record);

                //console.log('index',index, data[index]);
                
                    

            });


            //console.log('data.length',data.length);
            //console.log('data',data);
            // driver.quit();

        };


        get_links(links,data_loop);


    }



    forEach(sites_config, function(site_config, index, arr) {
        //console.log("each", item, index, arr);
        parse_site(site_config);
                   

    });

    
    // parse_site(sites_config[1]);
    // parse_site(sites_config[2]);
    driver.quit();
    
};

module.exports = Parser;