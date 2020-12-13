const calendar = new Vue（{
  el：'#calendar'，
  数据：{
    simplemode：true，//打开时使用画布重新排列gitcalendar，关闭时使用svg放置gitcalendar
	                  // canvas：dom数少，但图像会发生模糊，自适应一般svg：dom数多，图像清晰，自适应更佳  
	                  
    user：'ylcmy'，//这里填写你的github用户名
    
	固定：“固定”，
    px：“ px”，
    X： ''，
    y：“，
    span1：''，
    span2：”，
    月：['一月'，'二月'，'三月'，'四月'，'五月'，'六月'，'七月'，'八月'，'九月'，'十月”，“十一月”，“十二月”]，
    monthchange：[]，
    前一年：”，
    这天： ''，
    一个月前： ''，
    一周以前： ''，
    weekdatacore：0，
    数据核心：0，
    总计：0，
    datadate：“，
    数据：[]，
    positionplusdata：[]，
    第一周： []，
    上个星期： []，
    星期前：[]，
    本周数据核心：0，
    mounthbeday：0，
    mounthfirstindex：0，
    薄脆饼干：“脆皮”，
    今日索引：0，
    amonthagoindex：0，
    一个月前的一周：[]，
    第一次约会： []，
    first2date：[]，
    前一个月：[]，
    monthindex：0，
    紫色：['＃ebedf0'，'＃fdcdec'，'＃fc9bd9'，'＃fa6ac5'，'＃f838b2'，'＃f5089f'，'＃c4067e'，'＃92055e'，'＃540336'，'＃ 48022f'，“＃30021f”，]，
    绿色：['＃ebedf0'，'＃f0fff4'，'＃dcffe4'，'＃bef5cb'，'＃85e89d'，'＃34d058'，'＃28a745'，'＃22863a'，'＃176f2c'，'＃ 165c26'，'＃144620']，
    蓝色：['＃ebedf0'，'＃f1f8ff'，'＃dbedff'，'＃c8e1ff'，'＃79b8ff'，'＃2188ff'，'＃0366d6'，'＃005cc5'，'＃044289'，'＃ 032f62”，“＃05264c”，]，
    颜色：['＃ebedf0'，'＃fdcdec'，'＃fc9bd9'，'＃fa6ac5'，'＃f838b2'，'＃f5089f'，'＃c4067e'，'＃92055e'，'＃540336'，'＃ 48022f'，“＃30021f”，]
  }，
  方法： {
    selectStyle（数据，事件）{
      $（'。angle-wrapper'）。show（）;
      this.span1 = data.date;
      this.span2 = data.count;
      this.x = event.clientX-100;
      this.y = event.clientY-60
    }，
    outStyle（）{
      $（'。angle-wrapper'）。hide（）
    }，
    thiscolor（x）{
      如果（x === 0）{
        让我= parseInt（x / 2）;
        返回this.color [0]
      }否则，如果（x <2）{
        返回this.color [1]
      }否则，如果（x <20）{
        让我= parseInt（x / 2）;
        返回this.color [i]
      }其他{
        返回this.color [9]
      }
    }，
  }
}）;
让githubapiurl =“ https://githubapi.ryanchristian.dev/user/” + calendar.user;
$（函数（）{
  $ .ajax（{
    类型：“ GET”，
    网址：githubapiurl，
    dataType：“ json”，
    成功：功能（数据）{
      ;
      calendar.data = data.contributions;
      calendar.total = data.total;
      calendar.first2date = calendar.data [48];
      calendar.firstdate = calendar.data [47];
      calendar.firstweek = data.contributions [0];
      calendar.lastweek = data.contributions [52];
      calendar.beforeweek = data.contributions [51];
      calendar.thisdayindex = calendar.lastweek.length-1;
      calendar.thisday = calendar.lastweek [calendar.thisdayindex] .date;
      calendar.oneyearbeforeday = calendar.firstweek [0] .date;
      calendar.monthindex = calendar.thisday.substring（5，7）* 1;
      calendar.montharrbefore = calendar.month.splice（calendar.monthindex，12-calendar.monthindex）;
      calendar.monthchange = calendar.montharrbefore.concat（calendar.month）;
      addweek（）;
      addlastmonth（）;

      函数响应图表（）{
        让c = document.getElementById（“ gitcanvas”）;
        让cmessage = document.getElementById（“ gitmessage”）;
        让ctx = c.getContext（“ 2d”）;
        c.width = document.getElementById（“ calendarcanvasbox”）。offsetWidth;
        令linemaxwitdh = 0.96 * c.width / calendar.data.length;
        c.height = 9 * linemaxwitdh;
        令lineminwitdh = 0.8 * linemaxwitdh;
        让setposition = {
          x：0.02 * c.width，
          y：0.025 * c.width
        };
        的（让calendar.data中的星期）{
          weekdata = calendar.data [week];
          为（在周数据中的某天）{
            let dataitem = {date：“”，count：“”，x：0，y：0};
            calendar.positionplusdata.push（dataitem）;
            ctx.fillStyle = calendar.thiscolor（weekdata [day] .count）;
            setposition.y = Math.round（setposition.y * 100）/ 100;
            dataitem.date = weekdata [day] .date;
            dataitem.count = weekdata [day] .count;
            dataitem.x = setposition.x;
            dataitem.y = setposition.y;
            ctx.fillRect（setposition.x，setposition.y，lineminwitdh，lineminwitdh）;
            setposition.y = setposition.y + linemaxwitdh
          }
          ;
          setposition.y = 0.025 * c.width;
          setposition.x = setposition.x + linemaxwitdh
        }
        ;
        ctx.font =“ 600 Arial”;
        ctx.fillStyle ='#aaa';
        ctx.fillText（“日”，0，1.9 * linemaxwitdh）;
        ctx.fillText（“二”，0，3.9 * linemaxwitdh）;
        ctx.fillText（“四”，0，5.9 * linemaxwitdh）;
        ctx.fillText（“六”，0，7.9 * linemaxwitdh）;
        让monthindexlist = c.width / 24;
        对于（让calendar.monthchange中的索引）{
          ctx.fillText（calendar.monthchange [index]，monthindexlist，0.7 * linemaxwitdh）;
          monthindexlist = monthindexlist + c.width / 12
        }
        ;
        cmessage.onmousemove =函数（事件）{
          $（'。angle-wrapper'）。hide（）
        };
        c.onmousemove =函数（事件）{
          $（'。angle-wrapper'）。hide（）
          getMousePos（c，event）;
        };

        函数getMousePos（canvas，event）{
          var rect = canvas.getBoundingClientRect（）;
          var x = event.clientX-rect.left *（canvas.width / rect.width）;
          var y = event.clientY-rect.top *（canvas.height / rect.height）;
          //console.log("x:"+x+",y:"+y）;
          用于（calendar.positionplusdata的项目）{
            令lenthx = x-item.x;
            让lenthy = y-item.y;
            //console.log(lenthx,lenthy）;
            如果（0 <lenthx && lenthx <lineminwitdh）{
              如果（0 <lenthy && lenthy <lineminwitdh）{
                //console.log(item.date,item.count）
                $（'。angle-wrapper'）。show（）;
                calendar.span1 = item.date;
                calendar.span2 = item.count;
                calendar.x = event.clientX-100;
                calendar.y = event.clientY-60
              }
            }
            // if（0 <x-item.x <lineminwitdh && 0 <y-item.y <lineminwitdh）{
            //console.log(item.count,item.date）;
            //}
          }
        }
      }

      响应图表（）;
      $（window）.on（'resize'，响应图）;
      window.onscroll = function（）{
        $（'。angle-wrapper'）。hide（）
      };
      console.log（calendar.positionplusdata）

      函数addlastmonth（）{
        如果（calendar.thisdayindex === 0）{
          这个星期核心（52）;
          这个星期核心（51）;
          thisweekcore（50）;
          这个星期核心（49）;
          thisweekcore（48）;
          calendar.thisweekdatacore + = calendar.firstdate [6] .count;
          calendar.amonthago = calendar.firstdate [6] .date
        }其他{
          这个星期核心（52）;
          这个星期核心（51）;
          thisweekcore（50）;
          这个星期核心（49）;
          thisweek2core（）;
          calendar.amonthago = calendar.first2date [calendar.thisdayindex-1] .date
        }
      };

      函数thisweek2core（）{
        for（让i = calendar.thisdayindex-1; i <calendar.first2date.length; i ++）{
          calendar.thisweekdatacore + = calendar.first2date [i] .count
        }
      };

      功能thisweekcore（index）{
        对于（letter calendar.data [index]项目）{
          calendar.thisweekdatacore + = item.count
        }
      };

      函数addlastweek（）{
        为（让calendar.lastweek的项目）{
          calendar.weekdatacore + = item.count
        }
      };

      函数addbeforeweek（）{
        for（让i = calendar.thisdayindex; i <calendar.beforeweek.length; i ++）{
          calendar.weekdatacore + = calendar.beforeweek [i] .count
        }
      };

      函数addweek（）{
        如果（calendar.thisdayindex === 6）{
          calendar.aweekago = calendar.lastweek [0] .date;
          addlastweek（）
        }其他{
          lastweek = data.contributions [51];
          calendar.aweekago =上周[calendar.thisdayindex +1] .date;
          addlastweek（）;
          addbeforeweek（）
        }
      }
    }
  }）
}）;
if（document.getElementById（“ calendarcanvasbox”）。offsetWidth <500）{calendar.simplemode = false}
