<?php
header('Content-Type: application/json');
$results = scandir(__DIR__);
foreach ($results as $result) {
	if ($result === '.' or $result === '..') continue;

	if (is_dir(__DIR__ . '/' . $result)) {
		$directories[] = [
			"name" => str_replace(".codeception", "", $result),
			"link" => "/" . $result . "/",
			"logo" => file_exists(realpath(dirname(__FILE__)) . "/" . $result . "/logo.png") ?  "/" . $result . "/logo.png" : false,
		];
	}
}
echo json_encode($directories, JSON_OBJECT_AS_ARRAY | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
