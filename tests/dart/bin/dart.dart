import 'package:http/http.dart' as http;

Uri url = Uri.parse('http://localhost:3333/files');

void main(List<String> arguments) {
  print('Hello!');
  var request = http.MultipartRequest('POST', url);
  http.MultipartFile.fromPath(
    'video',
    '/home/Zeeshan/boys.mp4',
    filename: 'boys.mp4',
    contentType: ,
  ).then((http.MultipartFile file) {
    request.files.add(file);
    request.send().then((http.StreamedResponse res) {
      print(res);
    });
  }).catchError((error) {
    print(error);
  });
}
