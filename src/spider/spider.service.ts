import * as fs from 'fs';
import axios from 'axios';
import * as path from 'path';
import * as cheerio from 'cheerio';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpiderService {
  async findAll() {
    const NEXT_Text = '下一页';
    const baseUrl = 'https://www.jpmn5.cc';
    const urls: string[] = [];

    /** 表示当前页, 用于拼接需要爬取图片的页面地址 */
    let index = 0;

    const getCosPlay = async () => {
      const body = await axios
        .get(`${baseUrl}/Cosplay/Cosplay10772${index ? '_' + index : ''}.html`)
        .then((res) => res.data);

      const $ = cheerio.load(body);
      /** 获取class为pagination的元素下的所有a标签 */
      const page = $('.pagination').eq(0).find('a');

      /** 获取a标签的文字内容 */
      const pageArray = page
        .map(function () {
          return $(this).text();
        })
        .toArray();

      /** 如果a标签文字内容包含 `下一页` 则继续递归获取图片地址 */
      if (pageArray.includes(NEXT_Text)) {
        $('.article-content p img').each(function () {
          urls.push(baseUrl + $(this).attr('src'));
        });
        index++;
        await getCosPlay();
      }
    };
    await getCosPlay();
    this.writeFile(urls);
    return `Cosplay`;
  }

  writeFile(urls: string[]) {
    urls.forEach(async (url) => {
      const buffer = await axios
        .get(url, { responseType: 'arraybuffer' })
        .then((res) => res.data);
      const ws = fs.createWriteStream(
        path.join(__dirname, '../cos' + new Date().getTime() + '.jpg'),
      );
      ws.write(buffer);
    });
  }
}
