<?php
header('Content-Type: application/json');
$env = trim($_REQUEST['env']);
$page = trim($_REQUEST['page']);
$repo = trim($_REQUEST['repo']);

$result = ['success' => false];
$isJsonFileExists = file_exists($_SERVER['DOCUMENT_ROOT'] . '/' . $repo . '/json/' . $env . '.json');
if (!$isJsonFileExists) {
	$result = ['success' => false, 'message' => 'запрошенный файл не существует: '. $_SERVER['DOCUMENT_ROOT'] . $repo . '/json/' . $env . '.json'];
	echo json_encode($result);
	die();
}
$data = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/' . $repo . '/json/' . $env . '.json'), null, 512, JSON_OBJECT_AS_ARRAY | JSON_UNESCAPED_SLASHES);
$data[$page][$env]['toggled'] = !$data[$page][$env]['toggled'];

$reference = $_SERVER['DOCUMENT_ROOT'] . $data[$page][$env]['reference'];

if(!file_exists($reference)) {
	$result = ['success' => false, 'message' => 'изображение эталона не существует'];
	echo json_encode($result);
	die();
}

$example = $_SERVER['DOCUMENT_ROOT'] . $data[$page][$env]['example'];

if(!file_exists($example)) {
	$result = ['success' => false, 'message' => 'изображение последнего скриншота не существует'];
	echo json_encode($result);
	die();
}


$ref2 = str_replace("page", "page2", $reference);

rename($reference, $ref2);
rename($example, $reference);
rename($ref2, $example);

file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/' . $repo . '/json/' . $env . '.json', json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
echo json_encode(['success' => true]);
