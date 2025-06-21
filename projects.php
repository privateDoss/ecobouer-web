<?php
$projectsDir = 'img/ecobouer/projects/';
$projects = [];

foreach (scandir($projectsDir) as $projectFolder) {
  if ($projectFolder === '.' || $projectFolder === '..') continue;

  $images = [];
  $fullPath = $projectsDir . $projectFolder;

  if (is_dir($fullPath)) {
    foreach (scandir($fullPath) as $file) {
      if (in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'webp'])) {
        $images[] = "$fullPath/$file";
      }
    }
  }

  if (!empty($images)) {
    $projects[] = [
      'name' => $projectFolder,
      'images' => $images,
    ];
  }
}

header('Content-Type: application/json');
echo json_encode($projects);
