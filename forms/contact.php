<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Retrieve form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate form data
    if (!empty($name) && !empty($email) && !empty($subject) && !empty($message)) {

        // Set up email
        $to = "toni.superstar3@gmail.com";  // Your email address
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Subject: $subject\n\n";
        $email_content .= "Message:\n$message\n";

        // Send email
        if (mail($to, $subject, $email_content, $headers)) {
            echo json_encode(['status' => 'success', 'message' => 'Message sent successfully!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to send message.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Please fill in all fields.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
