import pyexiv2
import json

def insert_frame(image, queue, drone_dsn, videoFilePath):
    cv.imwrite("./frame.jpg", image)
    height, width, channels = image.shape
    imageId = str(uuid.uuid4())
    fileName = imageId + ".jpg"
    block_blob_service.create_blob_from_path("frames", fileName, "frame.jpg")
    videoFilePath = os.path.basename(videoFilePath)
    videoID = videoFilePath.split(".")[0]
    queue_service.put_message(queue, imageId + ".jpg")
    send_data = {
      "drone_dsn": drone_dsn,
      "imageId": imageId,
      "videoId": videoID,
      "height": height,
      "width": width
    }
    print("posting to ", config.URL)
    print(send_data)
    return send_data


metadata = pyexiv2.ImageMetadata(filename)
metadata.read()
userdata={'Category':'Human',
          'Physical': {
              'skin_type':'smooth',
              'complexion':'fair'
              },
          'Location': {
              'city': 'london'
              }
          }
metadata['Exif.Photo.UserComment']=json.dumps(userdata)
metadata.write()
