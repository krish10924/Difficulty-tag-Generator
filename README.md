# DATSO

### Description
DATSO is a Google chrome extension designed to assign "difficulty level tags" to SO posts. This tool leverages the textual and numerical features of posts This focused method can decrease the number of unanswered questions and enhance response times by encouraging users with the appropriate expertise to provide timely and relevant answers based on the question's difficulty level.

The process begins with generating embeddings for the textual data using Sentence BERT. These embeddings are then combined with the context-dependent parameters of the post, followed by the SMOTE data balancing technique, and fed into a machine learning classifier to generate relevant tags. The methodology of DATSO is shown below - 

figure

![Seq Diagram](/assets/approach_diagram.png)

DATSO labels the posts into three categories: Basic, Intermediate, and Advanced. This categorization is based on a specific set of annotation rules provided by the following work - 

*“Raida, Maliha Noushin, et al. "A study on classifying Stack Overflow questions based on difficulty by utilizing contextual features." Journal of Systems and Software 208 (2024): 111884.”*
Link - https://www.sciencedirect.com/science/article/pii/S0164121223002790


### System Requirements
- Python 3.12.0 or higher
* Google Chrome browser

### Installation and Setup
#### Clone the Repository
Clone the repository using the following command:

```git clone https://github.com/krish10924/Difficulty-tag-Generator.git```

#### Install Dependencies
Install the required packages:

```pip3 install requirements.txt```

#### Start the Server
Navigate to the server folder , run the following command to start the server:

```python3 backend.py```

#### Load the Extension
Open Google Chrome and navigate to **chrome://extensions**.
Enable the "Developer mode" option.
Click on **"Load unpacked"** and select the directory where the extension is located.
### Usage
Navigate to a Stack Overflow question page containing a question with **Java** tag.
Few examples posts are listed below: 
- https://stackoverflow.com/questions/80476/how-can-i-concatenate-two-arrays-in-java
* https://stackoverflow.com/questions/154724/when-would-you-use-a-weakhashmap-or-a-weakreference
+ https://stackoverflow.com/questions/42784797/is-there-a-way-to-force-google-speech-api-to-return-only-words-as-response

The extension will automatically analyze the question and assign a difficulty level tag.
### Important Links
Video Demonstration

https://youtu.be/VSu2Q0zb-X0
