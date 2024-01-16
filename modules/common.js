export function returnError(response, isCheked){
    if(!isCheked)
        console.log(`Failed with error code ${response.status}: ${response.status_text}`);
}