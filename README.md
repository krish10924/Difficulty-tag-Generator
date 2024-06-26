# DATSO: Difficulty Assessment Tool for Stack Overflow Questions

### Description
DATSO (Difficulty Assessment Tool for Stack Overflow Questions) is a Chrome extension designed to assign "difficulty level tags" to Stack Overflow posts. This tool leverages the textual and context-dependent features of questions to assess their difficulty, aiming to improve the response time and quality of answers on the platform. A preliminary evaluation on a benchmark dataset of Java questions achieved an accuracy of 73%, surpassing existing baselines.

### System Requirements
Python 3.12.0 or higher
Google Chrome browser

### Installation and Setup
#### Clone the Repository
Clone the repository using the following command:
```git clone git clone https://github.com/krish10924/Difficulty-tag-Generator.git```

#### Install Dependencies
Install the required packages:
```pip3 install requirements.txt```

#### Start the Server
Navigate to the server folder , run the following command to start the server:
```python3 backend.py```

#### Load the Extension
Open Google Chrome and navigate to chrome://extensions.
Enable the "Developer mode" option.
Click on "Load unpacked" and select the directory where the extension is located.
### Usage
Navigate to a Stack Overflow question page containing a question with **Java** tag.
Few examples of stackoverflow post are listed below: 
- https://stackoverflow.com/questions/80476/how-can-i-concatenate-two-arrays-in-java
* https://stackoverflow.com/questions/154724/when-would-you-use-a-weakhashmap-or-a-weakreference
+ https://stackoverflow.com/questions/42784797/is-there-a-way-to-force-google-speech-api-to-return-only-words-as-response

The extension will automatically analyze the question and assign a difficulty level tag.
### Important Links
Video Demonstration
