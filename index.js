//gets all the elements with class that timestamps has
const elements = document.getElementsByClassName('style-scope ytd-thumbnail-overlay-time-status-renderer')

//convert to array
//timestamps only in <span>
const timeStamps = Array.from(elements)
                    .filter(element => element.localName === 'span')
                    .map(span => span.innerText)
                    
