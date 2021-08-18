<?php
header('Content-Type: application/json');
$repo = trim($_REQUEST['repo']);
if (!is_dir($repo) && !file_exists($repo)) {
	$result = ['status' => 'error', 'message' => 'Запрошенный проект отсутствует на сервере автотестирования'];
	echo json_encode($result);
	die();
}
$mobileData = json_decode(file_get_contents($repo . '/json/mobile.json'), null, 512, JSON_OBJECT_AS_ARRAY | JSON_UNESCAPED_SLASHES);
$tabletData = json_decode(file_get_contents($repo . '/json/tablet.json'), null, 512, JSON_OBJECT_AS_ARRAY | JSON_UNESCAPED_SLASHES);
$desktopData = json_decode(file_get_contents($repo . '/json/desktop.json'), null, 512, JSON_OBJECT_AS_ARRAY | JSON_UNESCAPED_SLASHES);

$result = array_merge($desktopData, $tabletData, $mobileData);

foreach ($desktopData as $index => $desktopPage) {
	$result[$index] = $desktopPage;
	$status = 'success';
	if (in_array("warning", [$desktopPage['desktop']['status'],
		$tabletData[$index]['tablet']['status'],
		$mobileData[$index]['mobile']['status']])) {
		$status = "warning";
	}
	if (in_array("error", [$desktopPage['desktop']['status'],
		$tabletData[$index]['tablet']['status'],
		$mobileData[$index]['mobile']['status']])) {
		$status = "error";
	}
	if (in_array("critical", [$desktopPage['desktop']['status'],
		$tabletData[$index]['tablet']['status'],
		$mobileData[$index]['mobile']['status']])) {
		$status = "critical";
	}
	$result[$index]['tablet'] = $tabletData[$index]['tablet'];
	$result[$index]['mobile'] = $mobileData[$index]['mobile'];
	$result[$index]['status'] = $status;
}

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
