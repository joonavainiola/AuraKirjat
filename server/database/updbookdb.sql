update books set "genreCode" = 2 where "genreCode" = 1 and product_code >= '0000-0-000-10' and product_code <= '0000-0-000-19'; 
update books set "genreCode" = 3 where "genreCode" = 1 and product_code >= '0000-0-000-20' and product_code <= '0000-0-000-29';
update books set "genreCode" = 4 where "genreCode" = 1 and product_code >= '0000-0-000-30' and product_code <= '0000-0-000-39';
update books set "genreCode" = 5 where "genreCode" = 1 and product_code >= '0000-0-000-40' and product_code <= '0000-0-000-49';
update books set "genreCode" = 6 where "genreCode" = 1 and product_code >= '0000-0-000-50' and product_code <= '0000-0-000-59';
update books set "genreCode" = 7 where "genreCode" = 1 and product_code >= '0000-0-000-60' and product_code <= '0000-0-000-69';
update books set "genreCode" = 8 where "genreCode" = 1 and product_code >= '0000-0-000-70' and product_code <= '0000-0-000-79';
update books set "genreCode" = 9 where "genreCode" = 1 and product_code >= '0000-0-000-80' and product_code <= '0000-0-000-89';
update books set "genreCode" = 0 where "genreCode" = 1;
update books set "genreCode" = 1 where id > 0 and id < 4;

update books set path = '/images/lapset2.jpg', price = price - 1 where "genreCode" = 2 and product_code = '0000-0-000-11';
update books set path = '/images/history2.jpg', price = price - 1 where "genreCode" = 3 and product_code = '0000-0-000-20';
update books set path = '/images/tieteet2.jpg', price = price - 1 where "genreCode" = 4 and product_code = '0000-0-000-32';
update books set path = '/images/ohjelmointi2.jpg', price = price - 1 where "genreCode" = 5 and product_code = '0000-0-000-43';
update books set path = '/images/elama2.jpg', price = price - 1 where "genreCode" = 6 and product_code = '0000-0-000-52';
update books set path = '/images/ruoka2.png', price = price - 1 where "genreCode" = 7 and product_code = '0000-0-000-61';
update books set path = '/images/runous2.jpg', price = price - 1 where "genreCode" = 8 and product_code = '0000-0-000-70';
update books set path = '/images/kielet2.jpg', price = price - 1 where "genreCode" = 9 and product_code = '0000-0-000-87';

update books set path = '/images/lapset1.jpg' where "genreCode" = 2 and product_code <> '0000-0-000-11';
update books set path = '/images/history1.jpg' where "genreCode" = 3 and product_code <> '0000-0-000-20';
update books set path = '/images/tieteet1.jpg' where "genreCode" = 4 and product_code <> '0000-0-000-32';
update books set path = '/images/ohjelmointi1.jpg' where "genreCode" = 5 and product_code <> '0000-0-000-43';
update books set path = '/images/elama1.jpg' where "genreCode" = 6 and product_code <> '0000-0-000-52';
update books set path = '/images/ruoka1.jpg' where "genreCode" = 7 and product_code <> '0000-0-000-61';
update books set path = '/images/runous1.jpg' where "genreCode" = 8 and product_code <> '0000-0-000-70';
update books set path = '/images/kielet1.jpg' where "genreCode" = 9 and product_code <> '0000-0-000-87';

update books set path = '/images/kissa1.jpg' where product_code = '111-1-123-123-2';
update books set path = '/images/koira1.jpg' where product_code = '000-00-10-000';