import { Injectable, Logger } from '@nestjs/common';
import Got, { Got as GotType } from 'got';
import * as FormData from 'form-data';
import * as path from 'path';

import * as util from 'util';
import * as fs from 'fs-extra';
import { pipeline } from 'stream';
const pump = util.promisify(pipeline);

@Injectable()
export class GotService {
  private readonly logger = new Logger(GotService.name);
  httpheaders = {
    // accept: 'application/json',
  };
  got: GotType = Got;

  read(url: string, options) {
    const headers = Object.assign(this.httpheaders, options);
    return this.got
      .get(url, {
        headers: headers
      })
      .json();
  }

  update(url: string, body, options) {
    const headers = Object.assign(this.httpheaders, options);
    return this.got
      .put(url, {
        body: body,
        headers: headers
      })
      .json();
  }

  create(url: string, body, option, fetchRawResponse?) {
    const headers = Object.assign(this.httpheaders, option);
    const options: any = {
      headers: headers
    };
    if (Object.keys(body).length > 0) {
      options.body = JSON.stringify(body);
    }

    if (fetchRawResponse) {
      return this.got.post(url, options);
    }
    return this.got.post(url, options).json();
  }

  // async upload(url: string, body, option, id, type) {
  //   const types = {
  //     png: 'png',
  //     jpg: 'jpg',
  //     jpeg: 'jpeg',
  //     gif: 'gif'
  //   };
  //   const imageContainer = [];
  //   // Convert Base64 to image and
  //   // Save files locally
  //   const folder = type === 'ID' ? 'images' : 'selfie';
  //   for (const [key, value] of Object.entries(body)) {
  //     const img = (value as any).split(';base64,');
  //     const imgType = img[0].split('/')[1];
  //     const image = Buffer.from(img[1] as any, 'base64');

  //     imageContainer.push({
  //       key,
  //       imgType
  //     });
  //     await fs.outputFile(
  //       `/uploads/${id}/${folder}/${key}/${key}.${types[imgType]}`,
  //       image
  //     );
  //   }

  //   const form = new FormData();

  //   const files = this.traverseDir(`/uploads/${id}/${folder}`);

  //   for (let x = 0; x < files.length; x++) {
  //     const imageType = files[x].split('.')[1];
  //     const key = files[x].split('.')[0].split('/')[
  //       files[x].split('.')[0].split('/').length - 1
  //     ];
  //     const found = imageContainer.find((i) => i.key === key);
  //     if (found.imgType === imageType) {
  //       form.append(files[x].split('/')[4], fs.createReadStream(files[x]));
  //     }
  //   }

  //   return this.got
  //     .post(url, {
  //       headers: {
  //         'X-Forwarded-For': 'to-specify',
  //         apikey: option.apiKey,
  //         ...form.getHeaders()
  //       },
  //       body: form
  //     })
  //     .json();
  // }

  async upload(url: string, body, option, id, type, options) {
    const types = {
      png: 'png',
      jpg: 'jpg',
      jpeg: 'jpeg',
      gif: 'gif'
    };
    const imageContainer = [];
    // Convert Base64 to image and
    // Save files locally
    const folder = type === 'ID' ? 'images' : 'selfie';
    for (const [key, value] of Object.entries(body)) {
      const img = (value as any).split(';base64,');
      const imgType = img[0].split('/')[1];
      const image = Buffer.from(img[1] as any, 'base64');

      imageContainer.push({
        key,
        imgType
      });

      await fs.outputFile(
        `/uploads/${id}/${folder}/${key}/${key}.${types[imgType]}`,
        image
      );
    }

    const form = new FormData();
    if (options && options.documentType) {
      form.append('type', options.documentType);
    }
    if (options && options.applicantId) {
      form.append('applicant_id', options.applicantId);
    }

    const files = this.traverseDir(`/uploads/${id}/${folder}`);

    for (let x = 0; x < files.length; x++) {
      const imageType = files[x].split('.')[1];
      const key = files[x].split('.')[0].split('/')[
        files[x].split('.')[0].split('/').length - 1
      ];
      const found = imageContainer.find((i) => i.key === key);
      if (found.imgType === imageType) {
        form.append(files[x].split('/')[4], fs.createReadStream(files[x]));
      }
    }

    const headers = {
      ...option,
      ...form.getHeaders()
    };

    return this.got
      .post(url, {
        headers: headers,
        body: form
      })
      .json();
  }

  download(url: string, options) {
    const headers = Object.assign(
      {
        accept: '*/*'
      },
      options
    );

    return this.got
      .get(url, {
        headers: headers
      })
      .json();
  }

  delete(url: string, options) {
    const headers = Object.assign(this.httpheaders, options);
    return this.got
      .put(url, {
        headers: headers
      })
      .json();
  }

  traverseDir(dir) {
    const directory: any = [];
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        directory.push(this.traverseDir(fullPath));
      } else {
        directory.push(fullPath);
      }
    });
    return directory.flat();
  }
}
