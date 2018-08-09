import { Injectable } from '@angular/core';
import { registerShape } from 'viser-ng';

registerShape('point', 'pointer', {
  draw(cfg, container) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0
    });
    // 绘制指针
    container.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y + 15,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round'
      }
    });
    return container.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 9.75,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff'
      }
    });
  }
});
const scale = [{
  dataKey: 'value',
  min: 0,
  max: 9,
  tickInterval: 1,
  nice: true
}];

const color = ['#0086FA', '#FFBF00', '#F5222D'];

@Injectable({
  providedIn: 'root'
})
export class MemoryStatusService {
  title: string = 'Memory'
  data: any[] = [
    { value: 0 }
  ];
  scale = scale;
  axisLabel = {
    offset: -14,
    textStyle: {
      fontSize: 12,
      textAlign: 'center',
      textBaseline: 'middle'
    }
  };
  axisSubTickLine = {
    length: -8,
    stroke: '#fff',
    strokeOpacity: 1,
  };
  axisTickLine = {
    length: -17,
    stroke: '#fff',
    strokeOpacity: 1,
  };

  arcGuideBgStart = [0, 0.945];
  arcGuideBgEnd = [9, 0.945];
  arcGuideBgStyle = {
    stroke: '#CBCBCB',
    lineWidth: 18,
  };

  arcGuideLowStart = [0, 0.945];
  arcGuideLowEnd = [Math.max(0, Math.min(3, this.data[0].value)), 0.945];
  arcGuideLowStyle = {
    stroke: color[0],
    lineWidth: 18,
  };
  arcGuideMidStart = [3, 0.945];
  arcGuideMidEnd = [Math.max(3, Math.min(6, this.data[0].value)), 0.945];
  arcGuideMidStyle = {
    stroke: color[1],
    lineWidth: 18,
  };
  arcGuideHighStart = [6, 0.945];
  arcGuideHighEnd = [Math.max(6, Math.min(9, this.data[0].value)), 0.945];
  arcGuideHighStyle = {
    stroke: color[2],
    lineWidth: 18,
  };

  htmlGuidePosition = ['50%', '105%'];
  htmlGuideHtml = `
    <div style="width: 300px;text-align: center;">
      <p style="font-size: 20px;color: #545454;margin: 0;">${Math.ceil(this.data[0].value * 10)}%</p>
    </div>
  `;

  timer: any;
  trend: 'up' | 'down' = 'up';
  constructor() { }
  setData (delta: number) {
    console.log(delta);
    this.data[0].value = 0;
    const prevVal = this.data[0].value;
    if (this.trend === 'up') {
      const nextVal = prevVal + delta / 10;
      if (nextVal > 9) {
        this.trend = 'down';
      } else {
        this.data = [{ value: nextVal }];
        this.arcGuideLowEnd = [Math.max(0, Math.min(3, nextVal)), 0.945];
        this.arcGuideMidEnd = [Math.max(3, Math.min(6, nextVal)), 0.945];
        this.arcGuideHighEnd = [Math.max(6, Math.min(9, nextVal)), 0.945];
        this.htmlGuideHtml = `
          <div style="width: 300px;text-align: center;">
            <p style="font-size: 14px;color: #545454;margin: 0;">${Math.ceil(nextVal * 10)}%</p>
          </div>
        `;
      }
    } else {
      const nextVal = prevVal - delta;
      if (nextVal < 0) {
        this.trend = 'up';
      } else {
        this.data = [{ value: nextVal }];
        this.arcGuideLowEnd = [Math.max(0, Math.min(3, nextVal)), 0.945];
        this.arcGuideMidEnd = [Math.max(3, Math.min(6, nextVal)), 0.945];
        this.arcGuideHighEnd = [Math.max(6, Math.min(9, nextVal)), 0.945];
        this.htmlGuideHtml = `
          <div style="width: 300px;text-align: center;">
            <p style="font-size: 14px;color: #545454;margin: 0;">${Math.ceil(nextVal * 10)}%</p>
          </div>
        `;
      }
    }

  }
}

