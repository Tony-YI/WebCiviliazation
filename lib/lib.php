<?php
#$DATA_DIR is the abosolute path storing the permanent data, which is not accessible by HTTP request
#$RUNTIME_DATA_DIR is the abosolute path for the runtime root repository, a symbolic link should be created here for access to the permanent data
	$DATA_DIR = $_ENV['OPENSHIFT_DATA_DIR'];
	$RUNTIME_DATA_DIR = $_ENV['OPENSHIFT_REPO_DIR'];
?>