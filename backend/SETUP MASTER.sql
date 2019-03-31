-- setup appifact project manage master user

INSERT INTO `appifact_manage`.`tbl_user`
(`id`,
`firstName`,
`lastName`,
`middleName`,
`email`,
`phoneNum`,
`version`)
VALUES
('FE1A469-A9E2-4113-ABEE-E46CC117A362',
'Master',
'',
'',
'master@appifact.com',
'88888888',
1);

INSERT INTO `appifact_manage`.`tbl_user_auth` VALUES (
'220b08cc-889e-47ad-8a2e-eb3b504d77fe', '1', 'master', '$2a$08$SI0Ydszs3A0Jdjr5oxpJiOUZbpJkEulpvgHJ3FOQZTD.7EFSeyRWi', '$2a$08$SI0Ydszs3A0Jdjr5oxpJiO', '', '', '0', '2019-03-30 16:28:54', 'a6b33991-cff2-45eb-9e52-b044db997c7f', '2019-03-30 16:28:54.156420', 'ADMIN', '2019-03-30 16:29:09.000000', 'ADMIN', '3');

-- setup master role and permission
INSERT INTO `appifact_manage`.`tbl_role`
(`id`,
`name`,
`level`,
`description`)
VALUES
('C7740181-773B-43D6-84C3-6F55F9F72085',
'master',
9,
'Master of the system');

INSERT INTO `appifact_manage`.`tbl_permission`
(`id`,
`name`,
`action`,
`description`,
`roleId`,
`resource`)
VALUES
('5190DE3C-3B16-4020-8842-CF28A39A32E9',
'master\'s permission',
'*',
'all permission',
'C7740181-773B-43D6-84C3-6F55F9F72085',
'*');

UPDATE tbl_user_auth SET roleId = 'C7740181-773B-43D6-84C3-6F55F9F72085'
WHERE id = '220b08cc-889e-47ad-8a2e-eb3b504d77fe';


