<?php
/**
 * InfinityFree Compatible Contact Form Handler
 * Note: InfinityFree disables native PHP mail() to prevent spam.
 * This handler accepts the submission, validates the inputs,
 * and responds with 'OK' for the frontend validation script.
 */

header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "Method Not Allowed";
    exit;
}

$name    = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email   = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
$subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo "Please fill in all required fields.";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Please provide a valid email address.";
    exit;
}

// Return OK to trigger the frontend success state in validate.js
echo "OK";
?>
