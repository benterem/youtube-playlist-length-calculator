//gets all the elements with class that timestamps has
const elements = document.getElementsByClassName('style-scope ytd-thumbnail-overlay-time-status-renderer');

//convert to array
//timestamps only in <span>
const timeStamps = Array.from(elements)
                    .filter(element => element.localName === 'span')
                    .map(span => span.innerText);
                    
const timeInSeconds = [];

//parse array of timestamp strings into integers
timeStamps.forEach(timeStamp => {
  let timeArray = timeStamp.split(':');
  timeInSeconds.push(parseInt(timeArray[0] * 60));
  timeInSeconds.push(parseInt(timeArray[1]));
});

//reduce array to get playlist length
const playlistLength = timeInSeconds.reduce((a, c) => a + c);