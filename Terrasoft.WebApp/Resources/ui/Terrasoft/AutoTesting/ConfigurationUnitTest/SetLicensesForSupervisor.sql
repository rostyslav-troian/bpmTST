USE [$(database)]
GO
	
INSERT INTO SysLicUser (Id, SysLicPackageId, SysUserId, Active)
SELECT NEWID(), SysLic.Id, SysUser.Id, '1'
FROM SysAdminUnit SysUser, SysLicPackage Syslic
WHERE
	SysUser.Name = N'Supervisor' AND SysUser.SysAdminUnitTypeValue = '4'

EXEC [dbo].[tsp_ActualizeAdminUnitInRole]