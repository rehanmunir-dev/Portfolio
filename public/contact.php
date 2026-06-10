<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    $data = $_POST;
}

function clean_value($value) {
    return trim(str_replace(["\r", "\n"], ' ', (string) $value));
}

function clean_message($value) {
    return trim((string) $value);
}

$name = clean_value($data['name'] ?? '');
$email = clean_value($data['email'] ?? '');
$projectType = clean_value($data['projectType'] ?? '');
$message = clean_message($data['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['message' => 'Please fill your name, email, and project details.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['message' => 'Please enter a valid email address.']);
    exit;
}

$to = 'info@rehanmunir.tech';
$subject = 'Portfolio Inquiry from ' . $name;
$body = implode("\n", array_filter([
    'Name: ' . $name,
    'Email: ' . $email,
    $projectType !== '' ? 'Project type: ' . $projectType : '',
    '',
    'Project details:',
    $message,
]));

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Portfolio Inquiry <info@rehanmunir.tech>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['message' => 'Inquiry could not be sent right now. Please email info@rehanmunir.tech directly.']);
    exit;
}

echo json_encode(['message' => 'Inquiry submitted successfully.']);
