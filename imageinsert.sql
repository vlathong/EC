use QL_BANHANG
go

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-react-infinity-run-flyknit.png', Single_Blob) as image) where id = '1'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-react-miler.png', Single_Blob) as image) where id = '2'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-air-zoom-pegasus-37.png', Single_Blob) as image) where id = '3'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-joyride-run-flyknit.png', Single_Blob) as image) where id = '4'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-mercurial-vapor-13-elite-fg.png', Single_Blob) as image) where id = '5'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-phantom-vision-elite-dynamic-fit-fg.png', Single_Blob) as image) where id = '6'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-phantom-venom-academy-fg.png', Single_Blob) as image) where id = '7'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-mercurial-vapor-13-elite-fg.png', Single_Blob) as image) where id = '8'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-mercurial-vapor-13-elite-fg.png', Single_Blob) as image) where id = '9'
  
update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-mercurial-superfly-7-pro-mds-fg.png', Single_Blob) as image) where id = '10'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-air-force-1.png', Single_Blob) as image) where id = '11'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-air-max-90.png', Single_Blob) as image) where id = '12'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-air-max-90-ltr.png', Single_Blob) as image) where id = '13'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-joyride-dual-run.png', Single_Blob) as image) where id = '14'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nike-renew-run.png', Single_Blob) as image) where id = '15'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\ss-hl-0136.png', Single_Blob) as image) where id = '16'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\ss-hl-0136.png', Single_Blob) as image) where id = '17'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\ss-hl-0136.png', Single_Blob) as image) where id = '18'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\austin.png', Single_Blob) as image) where id = '19'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\ss-hl-0135.png', Single_Blob) as image) where id = '20'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\ss-hl-0136.png', Single_Blob) as image) where id = '21'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\ss-hl-0128.png', Single_Blob) as image) where id = '22'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\ss-ms-0075.png', Single_Blob) as image) where id = '23'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\ss-ms-0075.png', Single_Blob) as image) where id = '24'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\ss-pm-0093.png', Single_Blob) as image) where id = '25'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nizza-x-disney.png', Single_Blob) as image) where id = '26'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\x_plr.png', Single_Blob) as image) where id = '27'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\stan-smith.png', Single_Blob) as image) where id = '28'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nmd_r1.png', Single_Blob) as image) where id = '29'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\nmd_r1-flash-red.png', Single_Blob) as image) where id = '30'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\superstar.png', Single_Blob) as image) where id = '31'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\ss-hl-0136.png', Single_Blob) as image) where id = '32'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\sk80-low.png', Single_Blob) as image) where id = '33'

update PRODUCT set IMAGE = (select BulkColumn 
FROM Openrowset( Bulk 'D:\Desktop\shoes\michael-feburary-sk8-hi.png', Single_Blob) as image) where id = '34'



