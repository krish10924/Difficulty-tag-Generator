DATSO: Difficulty Assessment Tool for Stack Overflow Questions

Description
DATSO (Difficulty Assessment Tool for Stack Overflow Questions) is a Chrome extension designed to assign "difficulty level tags" to Stack Overflow posts. This tool leverages the textual and context-dependent features of questions to assess their difficulty, aiming to improve the response time and quality of answers on the platform. A preliminary evaluation on a benchmark dataset of Java questions achieved an accuracy of 73%, surpassing existing baselines.

System Requirements
Python 3.12.0 or higher
Google Chrome browser

Installation and Setup
Clone the Repository
Clone the repository using the following command:
git clone https://github.com/krish10924/Difficulty-tag-Generator.git

Install Dependencies
Navigate to the backend folder and install the required packages:
pip install -r requirements.txt

Start the Server
Run the following command to start the server:
python3 backend.py

Load the Extension
Open Google Chrome and navigate to chrome://extensions.
Enable the "Developer mode" option.
Click on "Load unpacked" and select the directory where the extension is located.
Usage
Navigate to a Stack Overflow question page containing a question with Java tag.
Example: Stack Overflow Question
https://chatgpt.com/share/f2e5cfe2-c1b7-4463-998e-18099d910b49
https://stackoverflow.com/questions/80476/how-can-i-concatenate-two-arrays-in-java

The extension will automatically analyze the question and assign a difficulty level tag.
Important Links
Video Demonstration
