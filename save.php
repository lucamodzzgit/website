<?php
// save.php - Das Gehirn des Servers

// --- HIER IST DEIN PASSWORT EINGEBAUT ---
$adminPassword = "LucaMasterKey2024!"; 
// ----------------------------------------

// Empfange die Daten vom Dashboard
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Prüfen, ob Daten da sind
if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Keine Daten empfangen"]);
    exit;
}

// Prüfen, ob das Passwort stimmt
if (!isset($data['auth']) || $data['auth'] !== $adminPassword) {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Falsches Passwort! Zugriff verweigert."]);
    exit;
}

// Daten speichern
if (isset($data['menus'])) {
    $jsonString = json_encode($data['menus'], JSON_PRETTY_PRINT);
    
    if (file_put_contents('data.json', $jsonString)) {
        echo json_encode(["status" => "success", "message" => "Gespeichert!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Server-Fehler: Schreibrechte fehlen für data.json"]);
    }
}
?>