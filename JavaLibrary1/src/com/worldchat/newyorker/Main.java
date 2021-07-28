package com.worldchat.newyorker;

import java.net.InetSocketAddress;
import java.io.*;

import java.util.*;
import com.worldchat.*;

public class Main 
{
    public static void main(String[] args) 
    {
        String[] filter =
        {
            "black-box"
        };

        for (int i = 0; i < stories.length; ++i)
        {
            /*
            boolean ok = false;

            for (int j = 0; j < filter.length; ++j)
                if (stories[i].indexOf(filter[j]) >= 0)
                {
                    ok = true;
                    break;
                }

            if (!ok)
                continue;
            */

            String page = null;
            try
            {
                Process p = Runtime.getRuntime().exec("curl " + stories[i]);
                byte[] pbuffer = U.readInputStream(p.getInputStream());
                page = new String(pbuffer, 0, pbuffer.length, "UTF-8");

                //log(page);

                int k = stories[i].lastIndexOf("/");
                String name = stories[i].substring(k + 1);


                log(name.replaceAll("-", " ").toUpperCase());

                String t = parse(page);
                String pre = 
                    "<style>@font-face  {   font-family: TNYAdobeCaslonPro;   src:    url(     'https://www.newyorker.com/verso/static/assets/fonts/TNYAdobeCaslonPro-Regular.ed4a81e054576d6e9ed73d6e01016e3c40589df3.woff2')   format('woff2'); } body {   font-family: TNYAdobeCaslonPro; } </style> <body style='margin-left:23%;margin-right:23%;line-height:25px;'>" +
                    "<head><title>Fifteen Years of New Yorker Stories</title><link rel='icon' href='favicon.png' /><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta charset='UTF-8'></head>";
                
                byte[] text = (pre + name.replaceAll("-", " ").toUpperCase() + "<br><br>" + t).getBytes("UTF-8");

                U.saveObject(text, 

                    //"/Users/matt/Desktop/newyorker/stories/"

                    "/Users/matt/Dropbox/Project/site/stories/stories/"

                    + name + ".html");
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }

    static String audioparse(String p)
    {
        int k = p.indexOf("[audio");
        //log("" + k);
        if (k > 0)
        {
            int q = p.indexOf("]", k);
            //log("" + q);
            if (q > k)
            {
                String y = p.substring(k, q + 1);
                log("removed audio");
                p = p.substring(0, k) + p.substring(q + 1, p.length());
            }
        }

        return p;
    }

    static String parse(String p)
    {
        p = audioparse(p);

        //log(p);

        String s = "+++dropcap\\n\\n";
        int k = p.indexOf(s);
        if (k < 0)
        {
            s = "## 1\\\\.";
            k = p.indexOf(s);
            if (k < 0)
            {
                s = "\"## 1\\n";
                k = p.indexOf(s);
                if (k < 0)
                {
                    log("no find 1");
                    log("p=" + p);
                    return null;
                }
            }
        }

        int q = p.indexOf("\"", k + 1);
        if (q < 0)
        {
            log("no find 2");
            log("p=" + p);
            return null;
        }

        

        p = p.substring(k + s.length(), q);
        
        p = p.replaceAll("\\+", "");
        p = p.replaceAll("dropcap", "");

        p = p.replaceAll(">", "");
        p = p.replaceAll("\\\\n", "<br>");
        p = p.replaceAll("\\\\", "");

       

        p = p.replaceAll("<br><br><br><br>", "<br><br>");


        return p;
    }

    static void list(Hashtable table)
    {
        Object[] x = table.keySet().toArray();
        String s = "";
        for (int i = 0; i < x.length; ++i)
        {
            Object e = table.get(x[i]);
            log(e);
        }
    }

    static void log(Object s)
    {
        System.out.println(s);
    }

    static String[] stories =
{
"https://www.newyorker.com/magazine/2016/12/12/pardon-edward-snowden",
"https://www.newyorker.com/magazine/2008/01/21/ash-monday",
"https://www.newyorker.com/magazine/2007/06/25/homework-8",
"https://www.newyorker.com/magazine/2010/04/05/gavin-highly",
"https://www.newyorker.com/magazine/2012/06/25/means-of-suppressing-demonstrations",
"https://www.newyorker.com/magazine/2009/11/23/indianapolis-highway-74",
"https://www.newyorker.com/magazine/2007/08/06/so-it-is-in-life",
"https://www.newyorker.com/magazine/2020/09/07/flashlight",
"https://www.newyorker.com/magazine/2015/08/24/these-short-dark-days",
"https://www.newyorker.com/magazine/2013/08/12/meet-the-president",
"https://www.newyorker.com/magazine/2006/12/25/on-chesil-beach",
"https://www.newyorker.com/magazine/2007/12/24/the-arbus-factor",
"https://www.newyorker.com/magazine/2007/08/27/nawabdin-electrician",
"https://www.newyorker.com/magazine/2013/07/01/mastiff",
"https://www.newyorker.com/magazine/2007/05/21/a-beneficiary",
"https://www.newyorker.com/magazine/2007/10/08/married-love-2",
"https://www.newyorker.com/magazine/2017/03/06/crazy-they-call-me",
"https://www.newyorker.com/magazine/2011/11/28/leaving-maverley",
"https://www.newyorker.com/magazine/2021/03/01/good-looking",
"https://www.newyorker.com/magazine/2020/10/26/nettle",
"https://www.newyorker.com/magazine/2019/11/11/the-flier",
"https://www.newyorker.com/magazine/2013/11/11/benji",
"https://www.newyorker.com/magazine/2008/03/24/the-region-of-unlikeness",
"https://www.newyorker.com/magazine/2020/11/23/the-old-man-in-the-piazza",
"https://www.newyorker.com/magazine/2009/12/14/all-that-2",
"https://www.newyorker.com/magazine/2011/01/10/the-years-of-my-birth",
"https://www.newyorker.com/magazine/2009/08/24/max-at-sea",
"https://www.newyorker.com/magazine/2012/12/10/a-voice-in-the-night",
"https://www.newyorker.com/magazine/2010/05/17/free-fruit-for-young-widows",
"https://www.newyorker.com/magazine/2016/01/25/aspic-fiction-tatyana-tolstaya",
"https://www.newyorker.com/magazine/2010/02/08/william-burns",
"https://www.newyorker.com/magazine/2015/05/18/so-youre-just-what-gone",
"https://www.newyorker.com/magazine/2012/09/10/the-casserole",
"https://www.newyorker.com/magazine/2014/06/30/the-pink-house",
"https://www.newyorker.com/magazine/2014/08/11/picasso",
"https://www.newyorker.com/magazine/2006/06/26/innocence-2",
"https://www.newyorker.com/magazine/2017/07/10/caring-for-plants",
"https://www.newyorker.com/magazine/2019/03/25/dandelion",
"https://www.newyorker.com/magazine/2020/04/06/love-letter",
"https://www.newyorker.com/magazine/2007/02/19/the-swan-4",
"https://www.newyorker.com/magazine/2018/09/10/audition",
"https://www.newyorker.com/magazine/2013/04/08/valentine-8",
"https://www.newyorker.com/magazine/2014/04/07/pending-vegan",
"https://www.newyorker.com/magazine/2016/06/27/upside-down-cake-by-paul-theroux",
"https://www.newyorker.com/magazine/2015/05/04/the-apologizer",
"https://www.newyorker.com/magazine/2009/01/12/pumpkin-head",
"https://www.newyorker.com/magazine/2011/05/23/the-trusty",
"https://www.newyorker.com/magazine/2019/06/03/canvas",
"https://www.newyorker.com/magazine/2020/10/12/suffocation-theory",
"https://www.newyorker.com/magazine/2020/07/06/a-transparent-woman",
"https://www.newyorker.com/magazine/2008/06/09/natasha-fiction-vladimir-nabokov",
"https://www.newyorker.com/magazine/2016/02/01/the-philosophers",
"https://www.newyorker.com/magazine/2019/03/18/color-and-light",
"https://www.newyorker.com/magazine/2008/10/20/sleep-fiction-roddy-doyle",
"https://www.newyorker.com/magazine/2012/02/13/citizen-conn",
"https://www.newyorker.com/magazine/2014/09/01/referees",
"https://www.newyorker.com/magazine/2017/06/05/clean-cleaner-cleanest",
"https://www.newyorker.com/magazine/2021/07/26/the-theresa-job",
"https://www.newyorker.com/magazine/2015/05/11/my-life-is-a-joke",
"https://www.newyorker.com/magazine/2013/09/30/the-breeze",
"https://www.newyorker.com/magazine/2008/01/14/wakefield",
"https://www.newyorker.com/magazine/2016/04/11/the-burglar-by-sarah-shun-lien-bynum",
"https://www.newyorker.com/magazine/2017/12/18/the-lazy-river",
"https://www.newyorker.com/magazine/2015/07/20/ghosts-and-empties",
"https://www.newyorker.com/magazine/2010/05/24/ash",
"https://www.newyorker.com/magazine/2012/11/26/bull-2",
"https://www.newyorker.com/magazine/2020/03/23/out-there",
"https://www.newyorker.com/magazine/2012/12/17/creatures",
"https://www.newyorker.com/magazine/2007/09/17/mr-bones",
"https://www.newyorker.com/magazine/2018/09/24/poor-girl",
"https://www.newyorker.com/magazine/2008/06/30/deep-holes",
"https://www.newyorker.com/magazine/2020/05/25/demolition",
"https://www.newyorker.com/magazine/2017/09/25/as-you-would-have-told-it-to-me",
"https://www.newyorker.com/magazine/2014/01/13/the-paper-revolution",
"https://www.newyorker.com/magazine/2014/05/05/the-naturals",
"https://www.newyorker.com/magazine/2014/10/20/ordinary-sins",
"https://www.newyorker.com/magazine/2020/11/09/ghoul",
"https://www.newyorker.com/magazine/2013/11/25/kilifi-creek",
"https://www.newyorker.com/magazine/2013/03/04/summer-of-38",
"https://www.newyorker.com/magazine/2009/02/09/the-invasion-from-outer-space",
"https://www.newyorker.com/magazine/2007/10/15/sin-dolor",
"https://www.newyorker.com/magazine/2011/08/29/el-morro",
"https://www.newyorker.com/magazine/2018/02/12/stanville",
"https://www.newyorker.com/magazine/2011/06/06/clever-girl",
"https://www.newyorker.com/magazine/2016/09/05/a-gentlemans-game-by-jonathan-lethem",
"https://www.newyorker.com/magazine/2006/09/18/something-that-needs-nothing",
"https://www.newyorker.com/magazine/2021/05/10/balloons",
"https://www.newyorker.com/magazine/2011/07/04/homage-to-hemingway",
"https://www.newyorker.com/magazine/2020/04/13/the-other-one",
"https://www.newyorker.com/magazine/2017/07/03/the-adventure-of-a-skier",
"https://www.newyorker.com/magazine/2008/01/28/the-reptile-garden",
"https://www.newyorker.com/magazine/2008/01/07/outage",
"https://www.newyorker.com/magazine/2012/06/04/my-internet",
"https://www.newyorker.com/magazine/2015/06/08/the-republic-of-bad-taste",
"https://www.newyorker.com/magazine/2021/07/12/satellites",
"https://www.newyorker.com/magazine/2011/09/26/dog-run-moon",
"https://www.newyorker.com/magazine/2018/01/15/texas",
"https://www.newyorker.com/magazine/2015/10/26/who-will-greet-you-at-home",
"https://www.newyorker.com/magazine/2020/06/08/pursuit-as-happiness",
"https://www.newyorker.com/magazine/2009/11/02/while-the-women-are-sleeping",
"https://www.newyorker.com/magazine/2007/12/03/the-visitor-7",
"https://www.newyorker.com/magazine/2016/06/06/two-men-arrive-in-a-village-by-zadie-smith",
"https://www.newyorker.com/magazine/2018/06/04/fungus",
"https://www.newyorker.com/magazine/2008/04/21/the-repatriates",
"https://www.newyorker.com/magazine/2014/01/27/the-frog-prince",
"https://www.newyorker.com/magazine/2020/01/27/you-will-never-be-forgotten",
"https://www.newyorker.com/magazine/2021/06/07/before-the-valley",
"https://www.newyorker.com/magazine/2020/06/22/grief",
"https://www.newyorker.com/magazine/2013/06/24/stars-3",
"https://www.newyorker.com/magazine/2015/10/12/usl-at-the-stadium",
"https://www.newyorker.com/magazine/2017/10/23/strangler-bob",
"https://www.newyorker.com/magazine/2007/12/24/alma",
"https://www.newyorker.com/magazine/2010/03/15/the-knocking",
"https://www.newyorker.com/magazine/2019/12/16/sevastopol",
"https://www.newyorker.com/magazine/2013/06/10/brotherly-love-2",
"https://www.newyorker.com/magazine/2016/05/02/choking-victim-by-alexandra-kleeman",
"https://www.newyorker.com/magazine/2018/08/27/ways-and-means",
"https://www.newyorker.com/magazine/2017/04/24/deaf-and-blind",
"https://www.newyorker.com/magazine/2015/06/08/love-is-blind-and-deaf",
"https://www.newyorker.com/magazine/2007/04/02/teaching",
"https://www.newyorker.com/magazine/2020/11/02/a-for-alone",
"https://www.newyorker.com/magazine/2014/06/23/madame-lazarus",
"https://www.newyorker.com/magazine/2018/04/02/the-intermediate-class",
"https://www.newyorker.com/magazine/2012/08/06/thank-you-for-the-light",
"https://www.newyorker.com/magazine/2013/09/09/the-heron",
"https://www.newyorker.com/magazine/2016/06/06/seven-people-dancing-by-langston-hughes",
"https://www.newyorker.com/magazine/2008/07/28/the-teacher-fiction-ruth-prawer-jhabvala",
"https://www.newyorker.com/magazine/2012/12/24/shirley-temple-three",
"https://www.newyorker.com/magazine/2013/12/23/the-christmas-miracle",
"https://www.newyorker.com/magazine/2021/05/24/the-party",
"https://www.newyorker.com/magazine/2017/03/13/solstice",
"https://www.newyorker.com/magazine/2008/12/22/dead-man-laughing",
"https://www.newyorker.com/magazine/2020/05/18/the-afterlife",
"https://www.newyorker.com/magazine/2020/02/17/with-the-beatles",
"https://www.newyorker.com/magazine/2020/02/10/three-women-of-chucks-donuts",
"https://www.newyorker.com/magazine/2017/05/01/two-ruminations-on-a-homeless-brother",
"https://www.newyorker.com/magazine/2011/08/01/reverting-to-a-wild-state",
"https://www.newyorker.com/magazine/2006/10/30/republica-and-grau",
"https://www.newyorker.com/magazine/2008/09/22/the-noble-truths-of-suffering",
"https://www.newyorker.com/magazine/2015/07/06/reading-comprehension-text-no-1",
"https://www.newyorker.com/magazine/2017/12/11/cat-person",
"https://www.newyorker.com/magazine/2008/12/08/waiting-fiction-amos-oz",
"https://www.newyorker.com/magazine/2008/06/09/tits-up-in-a-ditch",
"https://www.newyorker.com/magazine/2007/01/15/bravado",
"https://www.newyorker.com/magazine/2007/04/30/after-the-movie",
"https://www.newyorker.com/magazine/2007/07/02/the-mahogany-elephant",
"https://www.newyorker.com/magazine/2009/12/21/diary-of-an-interesting-year",
"https://www.newyorker.com/magazine/2012/04/30/hand-on-the-shoulder",
"https://www.newyorker.com/magazine/2011/11/14/miracle-polish",
"https://www.newyorker.com/magazine/2009/08/10/war-dances",
"https://www.newyorker.com/magazine/2012/06/18/the-golden-vanity",
"https://www.newyorker.com/magazine/2012/03/12/ever-since",
"https://www.newyorker.com/magazine/2016/03/21/a-resolute-man",
"https://www.newyorker.com/magazine/2013/06/10/slide-to-unlock",
"https://www.newyorker.com/magazine/2014/12/08/reverend",
"https://www.newyorker.com/magazine/2010/12/20/escape-from-spiderhead",
"https://www.newyorker.com/magazine/2016/06/06/the-polish-rider-by-ben-lerner",
"https://www.newyorker.com/magazine/2016/10/31/back-the-way-you-went",
"https://www.newyorker.com/magazine/2010/03/01/appetite",
"https://www.newyorker.com/magazine/2016/04/18/anhedonia-here-i-come-by-colin-barrett",
"https://www.newyorker.com/magazine/2013/11/04/weight-watchers",
"https://www.newyorker.com/magazine/2008/03/03/leaving-for-kenosha",
"https://www.newyorker.com/magazine/2007/01/29/cell-one",
"https://www.newyorker.com/magazine/2008/06/23/the-headstrong-historian",
"https://www.newyorker.com/magazine/2018/05/14/without-inspection",
"https://www.newyorker.com/magazine/2017/05/29/the-size-of-things",
"https://www.newyorker.com/magazine/2010/01/11/safari-3",
"https://www.newyorker.com/magazine/2013/03/18/checking-out",
"https://www.newyorker.com/magazine/2020/08/03/heirlooms",
"https://www.newyorker.com/magazine/2007/06/11/roy-spivey",
"https://www.newyorker.com/magazine/2008/03/31/great-experiment",
"https://www.newyorker.com/magazine/2019/01/21/do-not-stop",
"https://www.newyorker.com/magazine/2017/03/20/the-i-o-u",
"https://www.newyorker.com/magazine/2018/06/18/omakase",
"https://www.newyorker.com/magazine/2007/07/30/wasps",
"https://www.newyorker.com/magazine/2018/07/02/the-first-world",
"https://www.newyorker.com/magazine/2009/07/06/childcare",
"https://www.newyorker.com/magazine/2015/12/07/oktober",
"https://www.newyorker.com/magazine/2019/07/22/she-said-he-said",
"https://www.newyorker.com/magazine/2014/05/26/camilo",
"https://www.newyorker.com/magazine/2013/10/28/samsa-in-love",
"https://www.newyorker.com/magazine/2016/09/12/invasion-of-the-martians-by-robert-coover",
"https://www.newyorker.com/magazine/2020/08/24/cicadia",
"https://www.newyorker.com/magazine/2014/03/17/the-relive-box",
"https://www.newyorker.com/magazine/2011/05/16/the-cats-table",
"https://www.newyorker.com/magazine/2007/01/08/bear-meat",
"https://www.newyorker.com/magazine/2020/12/07/dietrologia",
"https://www.newyorker.com/magazine/2021/04/12/separation",
"https://www.newyorker.com/magazine/2008/11/17/lostronaut",
"https://www.newyorker.com/magazine/2013/09/16/by-fire",
"https://www.newyorker.com/magazine/2008/06/09/dont-cry",
"https://www.newyorker.com/magazine/2012/07/30/permission-to-enter",
"https://www.newyorker.com/magazine/2017/08/28/dogs-go-wolf",
"https://www.newyorker.com/magazine/2008/03/17/the-bell-ringer",
"https://www.newyorker.com/magazine/2015/12/21/bedtimes",
"https://www.newyorker.com/magazine/2014/03/31/the-big-cat",
"https://www.newyorker.com/magazine/2008/10/13/gold-boy-emerald-girl",
"https://www.newyorker.com/magazine/2010/05/31/agreeable",
"https://www.newyorker.com/magazine/2008/05/12/a-man-like-him",
"https://www.newyorker.com/magazine/2012/05/28/referential",
"https://www.newyorker.com/magazine/2009/11/30/midnight-in-dostoevsky",
"https://www.newyorker.com/magazine/2017/05/15/fly-already",
"https://www.newyorker.com/magazine/2008/08/25/awake-tobias-wolff",
"https://www.newyorker.com/magazine/2021/04/26/old-babes-in-the-wood",
"https://www.newyorker.com/magazine/2021/04/19/alvin",
"https://www.newyorker.com/magazine/2019/04/08/lulu",
"https://www.newyorker.com/magazine/2008/10/06/the-idiot-president",
"https://www.newyorker.com/magazine/2020/10/19/life-without-children",
"https://www.newyorker.com/magazine/2007/10/22/among-animals-and-plants",
"https://www.newyorker.com/magazine/2015/10/05/vespa",
"https://www.newyorker.com/magazine/2013/09/02/the-colonels-daughter",
"https://www.newyorker.com/magazine/2012/03/19/appreciation-7",
"https://www.newyorker.com/magazine/2016/12/05/tiny-man",
"https://www.newyorker.com/magazine/2010/12/06/costello",
"https://www.newyorker.com/magazine/2017/05/08/a-small-flame",
"https://www.newyorker.com/magazine/2015/01/05/ways-2",
"https://www.newyorker.com/magazine/2016/06/06/maybe-it-was-the-distance-by-jonathan-safran-foer",
"https://www.newyorker.com/magazine/2014/01/20/a-mistake",
"https://www.newyorker.com/magazine/2011/02/14/the-other-place",
"https://www.newyorker.com/magazine/2006/12/25/the-bible",
"https://www.newyorker.com/magazine/2011/02/28/paranoia-said-sayrafiezadeh",
"https://www.newyorker.com/magazine/2018/02/26/mrs-crasthorpe",
"https://www.newyorker.com/magazine/2020/11/16/hansa-and-gretyl-and-piece-of-shit",
"https://www.newyorker.com/magazine/2015/06/22/the-grow-light-blues",
"https://www.newyorker.com/magazine/2007/02/12/a-tranquil-star",
"https://www.newyorker.com/magazine/2007/08/20/swimming",
"https://www.newyorker.com/magazine/2009/04/13/the-color-of-shadows",
"https://www.newyorker.com/magazine/2014/07/21/wagner-in-the-desert",
"https://www.newyorker.com/magazine/2016/07/04/the-fugitive-by-t-coraghessan-boyle",
"https://www.newyorker.com/magazine/2018/01/08/foreign-returned",
"https://www.newyorker.com/magazine/2016/10/10/deer-season",
"https://www.newyorker.com/magazine/2011/09/05/town-of-cats",
"https://www.newyorker.com/magazine/2021/07/12/unread-messages",
"https://www.newyorker.com/magazine/2013/09/23/bad-dreams-3",
"https://www.newyorker.com/magazine/2018/10/01/when-we-were-happy-we-had-other-names",
"https://www.newyorker.com/magazine/2013/11/18/find-the-bad-guy",
"https://www.newyorker.com/magazine/2020/04/27/bedtime-story",
"https://www.newyorker.com/magazine/2011/06/13/asleep-in-the-lord",
"https://www.newyorker.com/magazine/2018/03/05/seeing-ershadi",
"https://www.newyorker.com/magazine/2018/05/21/the-long-black-line",
"https://www.newyorker.com/magazine/2008/12/15/the-woman-of-the-house",
"https://www.newyorker.com/magazine/2015/11/30/fifty-seven",
"https://www.newyorker.com/magazine/2009/10/12/the-godchildren",
"https://www.newyorker.com/magazine/2012/04/23/miss-lora",
"https://www.newyorker.com/magazine/2017/12/04/the-dog",
"https://www.newyorker.com/magazine/2018/11/12/cattle-praise-song",
"https://www.newyorker.com/magazine/2019/02/11/asleep-at-the-wheel",
"https://www.newyorker.com/magazine/2016/02/29/total-solar",
"https://www.newyorker.com/magazine/2020/04/20/the-media",
"https://www.newyorker.com/magazine/2018/01/22/writing-teacher",
"https://www.newyorker.com/magazine/2014/10/06/story-bird",
"https://www.newyorker.com/magazine/2009/03/02/brother-on-sunday",
"https://www.newyorker.com/magazine/2021/03/22/the-case-for-and-against-love-potions",
"https://www.newyorker.com/magazine/2009/08/31/the-fountain-house",
"https://www.newyorker.com/magazine/2018/07/23/now-more-than-ever",
"https://www.newyorker.com/magazine/2019/04/22/cut",
"https://www.newyorker.com/magazine/2015/06/08/the-prospectors",
"https://www.newyorker.com/magazine/2008/12/22/some-women",
"https://www.newyorker.com/magazine/2017/06/26/the-piano-teachers-pupil",
"https://www.newyorker.com/magazine/2015/03/09/a-death-stephen-king",
"https://www.newyorker.com/magazine/2015/11/23/save-a-horse-ride-a-cowgirl",
"https://www.newyorker.com/magazine/2011/08/08/what-have-you-done",
"https://www.newyorker.com/magazine/2020/08/17/you-are-my-dear-friend",
"https://www.newyorker.com/magazine/2017/04/17/you-are-happy",
"https://www.newyorker.com/magazine/2012/05/14/sweet-dreams",
"https://www.newyorker.com/magazine/2009/05/18/in-the-south",
"https://www.newyorker.com/magazine/2019/07/01/son-of-friedman",
"https://www.newyorker.com/magazine/2009/08/03/the-valetudinarian-2",
"https://www.newyorker.com/magazine/2010/11/22/assimilation",
"https://www.newyorker.com/magazine/2019/04/29/poetry",
"https://www.newyorker.com/magazine/2014/06/09/you-can-find-love-now",
"https://www.newyorker.com/magazine/2011/09/19/starlight-ann-beattie",
"https://www.newyorker.com/magazine/2006/09/11/black-ice",
"https://www.newyorker.com/magazine/2013/06/03/we-didnt-like-him",
"https://www.newyorker.com/magazine/2013/08/05/paranoia-shirley-jackson",
"https://www.newyorker.com/magazine/2017/09/04/the-metal-bowl",
"https://www.newyorker.com/magazine/2020/05/04/the-wish-for-a-good-young-country-doctor",
"https://www.newyorker.com/magazine/2006/10/09/landfill",
"https://www.newyorker.com/magazine/2014/07/07/apple-cake",
"https://www.newyorker.com/magazine/2015/03/30/this-is-an-alert",
"https://www.newyorker.com/magazine/2010/10/04/the-dungeon-master",
"https://www.newyorker.com/magazine/2010/04/19/prefiguration-of-lalo-cura",
"https://www.newyorker.com/magazine/2014/05/19/the-waitress",
"https://www.newyorker.com/magazine/2010/11/08/boys-town",
"https://www.newyorker.com/magazine/2013/10/21/the-bear-came-over-the-mountain-2",
"https://www.newyorker.com/magazine/2016/07/11/the-kings-teacup-at-rest-by-michael-andreasen",
"https://www.newyorker.com/magazine/2014/09/08/motherlode",
"https://www.newyorker.com/magazine/2012/04/16/transatlantic-3",
"https://www.newyorker.com/magazine/2008/11/10/leopard",
"https://www.newyorker.com/magazine/2010/11/01/blue-roses",
"https://www.newyorker.com/magazine/2019/11/18/the-trip",
"https://www.newyorker.com/magazine/2017/02/06/david-gilbert-underground",
"https://www.newyorker.com/magazine/2020/01/20/visitor",
"https://www.newyorker.com/magazine/2014/01/06/first-husband",
"https://www.newyorker.com/magazine/2008/05/26/the-full-glass",
"https://www.newyorker.com/magazine/2014/07/28/last-meal-whole-foods",
"https://www.newyorker.com/magazine/2018/03/12/the-poltroon-husband",
"https://www.newyorker.com/magazine/2013/05/27/thirteen-wives",
"https://www.newyorker.com/magazine/2007/12/24/natalie",
"https://www.newyorker.com/magazine/2012/03/26/chapter-two",
"https://www.newyorker.com/magazine/2017/08/07/the-itch-don-delillo",
"https://www.newyorker.com/magazine/2011/03/21/rollingwood",
"https://www.newyorker.com/magazine/2012/07/23/the-cheaters-guide-to-love",
"https://www.newyorker.com/magazine/2014/02/03/the-emerald-light-in-the-air",
"https://www.newyorker.com/magazine/2020/03/09/night-swim",
"https://www.newyorker.com/magazine/2008/05/05/them-old-cowboy-songs",
"https://www.newyorker.com/magazine/2009/06/08/old-wounds",
"https://www.newyorker.com/magazine/2013/07/29/collectors-3",
"https://www.newyorker.com/magazine/2006/08/28/how-was-it-to-be-dead",
"https://www.newyorker.com/magazine/2011/12/05/the-musical-brain",
"https://www.newyorker.com/magazine/2013/04/29/the-fragments",
"https://www.newyorker.com/magazine/2013/03/25/the-judges-will",
"https://www.newyorker.com/magazine/2019/11/25/arizona",
"https://www.newyorker.com/magazine/2011/01/31/axis-alice-munro",
"https://www.newyorker.com/magazine/2015/07/27/silk-brocade",
"https://www.newyorker.com/magazine/2009/02/23/the-daughters-of-the-moon",
"https://www.newyorker.com/magazine/2017/09/11/faqs",
"https://www.newyorker.com/magazine/2016/05/23/the-midnight-zone-by-lauren-groff",
"https://www.newyorker.com/magazine/2020/01/13/found-wanting",
"https://www.newyorker.com/magazine/2019/05/27/ross-perot-and-china",
"https://www.newyorker.com/magazine/2018/03/19/no-more-maybe",
"https://www.newyorker.com/magazine/2017/08/21/an-evening-out",
"https://www.newyorker.com/magazine/2006/07/10/the-phone-call-3",
"https://www.newyorker.com/magazine/2017/02/13/the-prairie-wife",
"https://www.newyorker.com/magazine/2018/12/17/time-for-the-eyes-to-adjust",
"https://www.newyorker.com/magazine/2020/06/29/the-rescue-will-begin-in-its-own-time",
"https://www.newyorker.com/magazine/2015/09/28/the-driver-fiction-thomas-mcguane",
"https://www.newyorker.com/magazine/2016/11/28/the-hanging-of-the-schoolmarm",
"https://www.newyorker.com/magazine/2007/06/11/wildwood",
"https://www.newyorker.com/magazine/2014/03/10/a-sheltered-woman",
"https://www.newyorker.com/magazine/2007/06/11/1966",
"https://www.newyorker.com/magazine/2009/10/26/procedure-in-plain-air",
"https://www.newyorker.com/magazine/2007/04/23/something-like-happy",
"https://www.newyorker.com/magazine/2009/01/05/the-limner",
"https://www.newyorker.com/magazine/2014/12/22/start-affair",
"https://www.newyorker.com/magazine/2019/10/14/sinners-in-the-hands-of-an-angry-god",
"https://www.newyorker.com/magazine/2007/12/24/beginners",
"https://www.newyorker.com/magazine/2019/10/21/are-you-experienced",
"https://www.newyorker.com/magazine/2012/05/21/the-proxy-marriage",
"https://www.newyorker.com/magazine/2017/06/05/crossing-the-river-no-name",
"https://www.newyorker.com/magazine/2012/08/27/amundsen",
"https://www.newyorker.com/magazine/2010/10/11/corrie",
"https://www.newyorker.com/magazine/2017/10/02/blueprints-for-st-louis",
"https://www.newyorker.com/magazine/2020/02/03/things-we-worried-about-when-i-was-ten",
"https://www.newyorker.com/magazine/2019/12/23/only-orange",
"https://www.newyorker.com/magazine/2014/10/27/alan-bean-plus-four",
"https://www.newyorker.com/magazine/2017/10/09/likes",
"https://www.newyorker.com/magazine/2020/06/08/confessions-of-a-shinagawa-monkey",
"https://www.newyorker.com/magazine/2018/01/01/whoever-is-there-come-on-through",
"https://www.newyorker.com/magazine/2021/03/08/the-crooked-house",
"https://www.newyorker.com/magazine/2007/10/29/the-cold-outside",
"https://www.newyorker.com/magazine/2010/04/12/the-tv",
"https://www.newyorker.com/magazine/2013/08/26/victory-7",
"https://www.newyorker.com/magazine/2012/07/02/another-life-2",
"https://www.newyorker.com/magazine/2019/01/07/philosophy-of-the-foot",
"https://www.newyorker.com/magazine/2007/03/26/playdate",
"https://www.newyorker.com/magazine/2015/09/07/in-the-act-of-falling",
"https://www.newyorker.com/magazine/2019/09/02/to-do",
"https://www.newyorker.com/magazine/2018/05/07/the-boarder",
"https://www.newyorker.com/magazine/2009/05/11/the-autobiography-of-j-g-b",
"https://www.newyorker.com/magazine/2009/07/20/rat-beach",
"https://www.newyorker.com/magazine/2017/01/02/most-die-young",
"https://www.newyorker.com/magazine/2015/04/06/musa",
"https://www.newyorker.com/magazine/2018/10/15/the-coast-of-leitrim",
"https://www.newyorker.com/magazine/2012/10/29/ox-mountain-death-song",
"https://www.newyorker.com/magazine/2020/03/16/the-liver",
"https://www.newyorker.com/magazine/2006/12/11/tango-2",
"https://www.newyorker.com/magazine/2018/10/22/flaubert-again",
"https://www.newyorker.com/magazine/2012/04/09/the-porn-critic",
"https://www.newyorker.com/magazine/2011/02/07/honor-tessa-hadley",
"https://www.newyorker.com/magazine/2009/05/04/the-slows",
"https://www.newyorker.com/magazine/2011/04/11/goo-book",
"https://www.newyorker.com/magazine/2015/11/02/the-gospel-according-to-garcia",
"https://www.newyorker.com/magazine/2016/10/24/an-honest-woman",
"https://www.newyorker.com/magazine/2010/01/18/a-death-in-kitchawank",
"https://www.newyorker.com/magazine/2007/05/07/one-minus-one",
"https://www.newyorker.com/magazine/2015/02/09/sweetness-2",
"https://www.newyorker.com/magazine/2019/12/02/the-curfew",
"https://www.newyorker.com/magazine/2008/08/11/the-dinner-party-joshua-ferris",
"https://www.newyorker.com/magazine/2011/10/03/the-house-on-sand-creek",
"https://www.newyorker.com/magazine/2010/05/03/la-vita-nuova",
"https://www.newyorker.com/magazine/2006/09/25/freight",
"https://www.newyorker.com/magazine/2000/12/25/the-brief-wondrous-life-of-oscar-wao",
"https://www.newyorker.com/magazine/2016/02/08/mothers-day-fiction-george-saunders",
"https://www.newyorker.com/magazine/2006/11/20/night-train-to-frankfurt",
"https://www.newyorker.com/magazine/2021/01/04/the-rivals",
"https://www.newyorker.com/magazine/2020/06/01/two-nurses-smoking",
"https://www.newyorker.com/magazine/2006/12/04/a-river-in-egypt",
"https://www.newyorker.com/magazine/2014/06/09/the-bad-graft",
"https://www.newyorker.com/magazine/2019/07/29/the-little-king",
"https://www.newyorker.com/magazine/2008/09/29/three-fiction-andrea-lee",
"https://www.newyorker.com/magazine/2017/05/22/a-love-story-samantha-hunt",
"https://www.newyorker.com/magazine/2014/09/15/dinosaurs-planets",
"https://www.newyorker.com/magazine/2016/08/01/the-abandonment-by-joshua-ferris",
"https://www.newyorker.com/magazine/2009/12/07/the-use-of-poetry",
"https://www.newyorker.com/magazine/2011/03/28/u-f-o-in-kushiro-haruki-murakami",
"https://www.newyorker.com/magazine/2012/01/02/creative-writing",
"https://www.newyorker.com/magazine/2021/07/05/my-apology",
"https://www.newyorker.com/magazine/2008/10/27/the-boy-who-had-never-seen-the-sea",
"https://www.newyorker.com/magazine/2013/12/09/the-late-novels-of-gene-hackman",
"https://www.newyorker.com/magazine/2015/08/03/five-arrows",
"https://www.newyorker.com/magazine/2013/12/02/roadkill",
"https://www.newyorker.com/magazine/2011/06/27/gravel-alice-munro",
"https://www.newyorker.com/magazine/2014/04/14/box-sets",
"https://www.newyorker.com/magazine/2016/11/21/flower-hunters",
"https://www.newyorker.com/magazine/2017/01/30/quarantine-by-alex-ohlin",
"https://www.newyorker.com/magazine/2016/03/07/buttony",
"https://www.newyorker.com/magazine/2019/02/18/the-confession",
"https://www.newyorker.com/magazine/2013/07/22/from-a-farther-room",
"https://www.newyorker.com/magazine/2009/06/29/ziggurat",
"https://www.newyorker.com/magazine/2014/04/28/the-man-in-the-woods",
"https://www.newyorker.com/magazine/2017/01/23/constructed-worlds",
"https://www.newyorker.com/magazine/2006/11/13/greensleeves",
"https://www.newyorker.com/magazine/2016/01/04/the-beach-boy",
"https://www.newyorker.com/magazine/2019/06/24/back-then",
"https://www.newyorker.com/magazine/2019/05/13/brawler",
"https://www.newyorker.com/magazine/2017/02/27/ladies-lunch-lore-segal",
"https://www.newyorker.com/magazine/2019/04/15/medusa",
"https://www.newyorker.com/magazine/2009/01/19/soldiers-joy",
"https://www.newyorker.com/magazine/2009/09/21/land-of-the-living",
"https://www.newyorker.com/magazine/2015/08/10/little-man",
"https://www.newyorker.com/magazine/2007/09/03/luda-and-milena",
"https://www.newyorker.com/magazine/2016/11/07/are-we-not-men",
"https://www.newyorker.com/magazine/2012/11/12/member-guest",
"https://www.newyorker.com/magazine/2018/12/10/chaunt",
"https://www.newyorker.com/magazine/2020/08/31/the-sand-banks-1861",
"https://www.newyorker.com/magazine/2009/09/28/temporary-2",
"https://www.newyorker.com/magazine/2010/12/13/youngthing",
"https://www.newyorker.com/magazine/2012/06/04/the-republic-of-empathy",
"https://www.newyorker.com/magazine/2010/06/07/extreme-solitude",
"https://www.newyorker.com/magazine/2014/11/03/empties",
"https://www.newyorker.com/magazine/2013/04/22/mexican-manifesto",
"https://www.newyorker.com/magazine/2014/06/02/ba-baboon",
"https://www.newyorker.com/magazine/2021/04/05/featherweight",
"https://www.newyorker.com/magazine/2017/11/06/the-hotel",
"https://www.newyorker.com/magazine/2017/07/31/christina-the-astonishing-1150-1224",
"https://www.newyorker.com/magazine/2016/07/25/stuff-by-joy-williams",
"https://www.newyorker.com/magazine/2012/11/19/demeter",
"https://www.newyorker.com/magazine/2018/10/08/the-rise-and-rise-of-annie-clark",
"https://www.newyorker.com/magazine/2019/09/09/the-stone",
"https://www.newyorker.com/magazine/2017/04/10/northeast-regional",
"https://www.newyorker.com/magazine/2015/11/16/the-weir",
"https://www.newyorker.com/magazine/2016/01/18/the-story-of-a-painter",
"https://www.newyorker.com/magazine/2008/02/04/friendly-fire",
"https://www.newyorker.com/magazine/2012/10/01/jack-and-the-mad-dog",
"https://www.newyorker.com/magazine/2017/06/05/show-dont-tell",
"https://www.newyorker.com/magazine/2008/12/22/meeting-with-enrique-lihn",
"https://www.newyorker.com/magazine/2013/06/10/an-inch-and-a-half-of-glory",
"https://www.newyorker.com/magazine/2010/02/01/fjord-of-killary",
"https://www.newyorker.com/magazine/2007/03/05/history-of-a-disturbance",
"https://www.newyorker.com/magazine/2020/09/28/face-time",
"https://www.newyorker.com/magazine/2013/05/20/the-dark-arts-2",
"https://www.newyorker.com/magazine/2013/03/11/kattekoppen",
"https://www.newyorker.com/magazine/2010/03/08/ask-me-if-i-care",
"https://www.newyorker.com/magazine/2019/12/09/old-hope",
"https://www.newyorker.com/magazine/2012/02/27/a-prairie-girl",
"https://www.newyorker.com/magazine/2010/03/22/the-pura-principle",
"https://www.newyorker.com/magazine/2008/07/07/thirteen-hundred-rats",
"https://www.newyorker.com/magazine/2006/10/23/stairway-to-heaven",
"https://www.newyorker.com/magazine/2007/11/26/alvaro-rousselots-journey",
"https://www.newyorker.com/magazine/2015/04/13/apollo",
"https://www.newyorker.com/magazine/2010/11/29/the-yellow",
"https://www.newyorker.com/magazine/2021/02/01/the-wind",
"https://www.newyorker.com/magazine/2015/06/29/the-flower",
"https://www.newyorker.com/magazine/2007/04/09/still-life-8",
"https://www.newyorker.com/magazine/2014/03/24/under-the-sign-of-the-moon",
"https://www.newyorker.com/magazine/2019/03/11/all-will-be-well",
"https://www.newyorker.com/magazine/2012/09/17/the-last-few-kilometres",
"https://www.newyorker.com/magazine/2008/09/08/face",
"https://www.newyorker.com/magazine/2020/09/21/switzerland",
"https://www.newyorker.com/magazine/2015/02/02/alice",
"https://www.newyorker.com/magazine/2012/10/15/the-semplica-girl-diaries",
"https://www.newyorker.com/magazine/2010/10/18/to-the-measures-fall",
"https://www.newyorker.com/magazine/2021/06/28/offside-constantly",
"https://www.newyorker.com/magazine/2013/01/28/mayfly",
"https://www.newyorker.com/magazine/2012/09/03/birnam-wood",
"https://www.newyorker.com/magazine/2011/03/07/backbone",
"https://www.newyorker.com/magazine/2018/04/09/the-state-of-nature",
"https://www.newyorker.com/magazine/2011/07/11/aphrodisiac",
"https://www.newyorker.com/magazine/2014/06/09/heres-the-story",
"https://www.newyorker.com/magazine/2011/04/18/a-withered-branch",
"https://www.newyorker.com/magazine/2016/08/08/didos-lament-by-tessa-hadley",
"https://www.newyorker.com/magazine/2015/09/14/chicken-hill",
"https://www.newyorker.com/magazine/2011/10/24/sun-city",
"https://www.newyorker.com/magazine/2007/07/23/shauntrelle",
"https://www.newyorker.com/magazine/2021/05/17/children-of-the-good-book",
"https://www.newyorker.com/magazine/2017/09/18/sunrise-sunset",
"https://www.newyorker.com/magazine/2019/09/30/the-fellow",
"https://www.newyorker.com/magazine/2018/01/29/the-boundary",
"https://www.newyorker.com/magazine/2021/01/18/blushes",
"https://www.newyorker.com/magazine/2014/02/10/moonlit-landscape-with-bridge",
"https://www.newyorker.com/magazine/2009/07/27/the-five-wounds",
"https://www.newyorker.com/magazine/2011/03/14/going-for-a-beer",
"https://www.newyorker.com/magazine/2009/04/06/visitation-3",
"https://www.newyorker.com/magazine/2012/09/24/the-third-born",
"https://www.newyorker.com/magazine/2019/05/06/the-escape",
"https://www.newyorker.com/magazine/2011/12/19/stone-mattress",
"https://www.newyorker.com/magazine/2013/02/11/the-embassy-of-cambodia",
"https://www.newyorker.com/magazine/2019/10/28/the-bunty-club",
"https://www.newyorker.com/magazine/2011/05/02/deniers",
"https://www.newyorker.com/magazine/2007/12/17/the-king-of-sentences",
"https://www.newyorker.com/magazine/2021/06/14/foster",
"https://www.newyorker.com/magazine/2016/02/22/sine-cosine-tangent",
"https://www.newyorker.com/magazine/2019/08/05/motherless-child",
"https://www.newyorker.com/magazine/2011/01/17/the-king-of-norway",
"https://www.newyorker.com/magazine/2017/11/13/riddle",
"https://www.newyorker.com/magazine/2015/04/27/peacetime",
"https://www.newyorker.com/magazine/2018/05/28/stay-down-and-take-it",
"https://www.newyorker.com/magazine/2019/03/04/the-starlet-apartments",
"https://www.newyorker.com/magazine/2018/02/05/bronze",
"https://www.newyorker.com/magazine/2021/02/15/casting-shadows",
"https://www.newyorker.com/magazine/2006/07/03/carnival-las-tablas",
"https://www.newyorker.com/magazine/2016/03/28/my-purple-scented-novel-fiction-by-ian-mcewan",
"https://www.newyorker.com/magazine/2014/09/29/rosendale",
"https://www.newyorker.com/magazine/2009/06/22/idols-2",
"https://www.newyorker.com/magazine/2008/09/15/a-spoiled-man",
"https://www.newyorker.com/magazine/2020/09/14/the-englishman",
"https://www.newyorker.com/magazine/2015/06/01/the-duniazat",
"https://www.newyorker.com/magazine/2013/10/07/im-the-meat-youre-the-knife",
"https://www.newyorker.com/magazine/2015/11/09/honey-bunny",
"https://www.newyorker.com/magazine/2016/06/20/bog-girl-by-karen-russell",
"https://www.newyorker.com/magazine/2015/04/20/major-maybe",
"https://www.newyorker.com/magazine/2012/12/03/literally",
"https://www.newyorker.com/magazine/2019/06/10/the-children",
"https://www.newyorker.com/magazine/2019/10/07/shape-ups-at-delilahs",
"https://www.newyorker.com/magazine/2015/10/19/cold-little-bird",
"https://www.newyorker.com/magazine/2017/07/24/everything-is-far-from-here",
"https://www.newyorker.com/magazine/2020/06/08/white-noise",
"https://www.newyorker.com/magazine/2016/08/22/papaya-by-thomas-mcguane",
"https://www.newyorker.com/magazine/2007/12/24/years-end",
"https://www.newyorker.com/magazine/2007/02/05/good-people",
"https://www.newyorker.com/magazine/2014/06/09/yesterday-3",
"https://www.newyorker.com/magazine/2007/11/05/the-dog-2",
"https://www.newyorker.com/magazine/2012/07/09/an-abduction",
"https://www.newyorker.com/magazine/2011/01/03/getting-closer-steven-millhauser",
"https://www.newyorker.com/magazine/2007/08/13/magda-mandela",
"https://www.newyorker.com/magazine/2012/08/13/after-ellen",
"https://www.newyorker.com/magazine/2010/01/04/baptizing-the-gun",
"https://www.newyorker.com/magazine/2018/04/23/a-flawless-silence",
"https://www.newyorker.com/magazine/2020/03/02/kid-positive",
"https://www.newyorker.com/magazine/2018/03/26/the-state",
"https://www.newyorker.com/magazine/2016/04/25/waiting-for-the-miracle-by-lara-vapnyar",
"https://www.newyorker.com/magazine/2011/04/04/atria",
"https://www.newyorker.com/magazine/2011/10/31/tenth-of-december",
"https://www.newyorker.com/magazine/2015/12/14/jelly-and-jack",
"https://www.newyorker.com/magazine/2012/05/07/nero",
"https://www.newyorker.com/magazine/2019/01/28/cream",
"https://www.newyorker.com/magazine/2009/03/30/julia-and-byron",
"https://www.newyorker.com/magazine/2017/10/16/funny-little-snake",
"https://www.newyorker.com/magazine/2020/05/11/the-resident-poet",
"https://www.newyorker.com/magazine/2016/11/14/of-windows-and-doors",
"https://www.newyorker.com/magazine/2006/10/16/the-photograph-3",
"https://www.newyorker.com/magazine/2018/09/17/cecilia-awakened",
"https://www.newyorker.com/magazine/2012/01/23/labyrinth-roberto-bolano",
"https://www.newyorker.com/magazine/2013/01/14/the-women-5",
"https://www.newyorker.com/magazine/2009/11/09/premium-harmony",
"https://www.newyorker.com/magazine/2008/02/25/the-shelter-of-the-world",
"https://www.newyorker.com/magazine/2009/06/01/love-affair-with-secondaries",
"https://www.newyorker.com/magazine/2010/10/25/the-tree-line-kansas-1934",
"https://www.newyorker.com/magazine/2018/06/25/the-luck-of-kokura",
"https://www.newyorker.com/magazine/2021/07/12/young-girls",
"https://www.newyorker.com/magazine/2011/06/13/home-george-saunders",
"https://www.newyorker.com/magazine/2011/04/25/the-good-samaritan",
"https://www.newyorker.com/magazine/2015/05/25/the-freezer-chest",
"https://www.newyorker.com/magazine/2020/12/14/rwanda",
"https://www.newyorker.com/magazine/2017/03/27/herman-melville-volume-i",
"https://www.newyorker.com/magazine/2018/04/30/treatments",
"https://www.newyorker.com/magazine/2012/02/06/los-gigantes",
"https://www.newyorker.com/magazine/2008/07/21/yurt",
"https://www.newyorker.com/magazine/2010/03/29/i-d",
"https://www.newyorker.com/magazine/2016/12/19/spiderweb",
"https://www.newyorker.com/magazine/2009/10/19/complicity",
"https://www.newyorker.com/magazine/2011/11/21/the-climber-room",
"https://www.newyorker.com/magazine/2013/06/10/rough-deeds",
"https://www.newyorker.com/magazine/2009/03/23/shes-the-one",
"https://www.newyorker.com/magazine/2010/11/15/the-trojan-prince",
"https://www.newyorker.com/magazine/2018/06/04/silver-tiger",
"https://www.newyorker.com/magazine/2009/11/16/alone-8",
"https://www.newyorker.com/magazine/2009/09/07/distant-relations",
"https://www.newyorker.com/magazine/2009/02/02/al-roosten",
"https://www.newyorker.com/magazine/2014/09/22/jack-july",
"https://www.newyorker.com/magazine/2014/11/10/primum-non-nocere",
"https://www.newyorker.com/magazine/2018/11/19/show-recent-some-love",
"https://www.newyorker.com/magazine/2018/11/26/the-frog-king",
"https://www.newyorker.com/magazine/2019/09/16/harbor",
"https://www.newyorker.com/magazine/2011/11/07/the-stain",
"https://www.newyorker.com/magazine/2008/03/10/raj-bohemian",
"https://www.newyorker.com/magazine/2013/06/10/happy-trails",
"https://www.newyorker.com/magazine/2014/12/15/savage-breast",
"https://www.newyorker.com/magazine/2011/06/13/above-and-below",
"https://www.newyorker.com/magazine/2019/05/20/the-presentation-on-egypt",
"https://www.newyorker.com/magazine/2007/03/19/lucky-alan",
"https://www.newyorker.com/magazine/2015/03/16/all-you-have-to-do",
"https://www.newyorker.com/magazine/2018/09/03/the-wind-cave",
"https://www.newyorker.com/magazine/2012/03/05/haven-alice-munro",
"https://www.newyorker.com/magazine/2011/08/15/gilgul",
"https://www.newyorker.com/magazine/2008/06/02/a-night-at-the-opera-fiction-janet-frame",
"https://www.newyorker.com/magazine/2014/02/17/come-together-3",
"https://www.newyorker.com/magazine/2020/10/05/rainbows",
"https://www.newyorker.com/magazine/2011/05/09/he-knew",
"https://www.newyorker.com/magazine/2013/01/21/experience-5",
"https://www.newyorker.com/magazine/2018/06/04/orange-world",
"https://www.newyorker.com/magazine/2021/02/08/a-wrinkle-in-the-realm",
"https://www.newyorker.com/magazine/2013/05/06/the-gray-goose",
"https://www.newyorker.com/magazine/2020/12/21/our-lady-of-the-quarry",
"https://www.newyorker.com/magazine/2016/09/19/how-can-i-help",
"https://www.newyorker.com/magazine/2008/04/28/bullfighting",
"https://www.newyorker.com/magazine/2016/01/11/1-equals-1",
"https://www.newyorker.com/magazine/2010/02/15/foster",
"https://www.newyorker.com/magazine/2006/12/18/the-first-sense",
"https://www.newyorker.com/magazine/2021/03/15/the-shape-of-a-teardrop",
"https://www.newyorker.com/magazine/2019/06/10/javi",
"https://www.newyorker.com/magazine/2008/12/22/another-manhattan",
"https://www.newyorker.com/magazine/2012/01/09/expectations-john-lanchester",
"https://www.newyorker.com/magazine/2007/12/10/found-objects",
"https://www.newyorker.com/magazine/2016/04/04/gods-work",
"https://www.newyorker.com/magazine/2013/01/07/the-lost-order",
"https://www.newyorker.com/magazine/2015/02/16/labyrinth-4",
"https://www.newyorker.com/magazine/2007/11/12/brooklyn-circle",
"https://www.newyorker.com/magazine/2009/04/20/a-tiny-feast",
"https://www.newyorker.com/magazine/2014/08/25/one-saturday-morning",
"https://www.newyorker.com/magazine/2013/12/16/coming-soon",
"https://www.newyorker.com/magazine/2015/01/26/inventions-2",
"https://www.newyorker.com/magazine/2019/09/23/wide-spot",
"https://www.newyorker.com/magazine/2012/01/30/someone",
"https://www.newyorker.com/magazine/2008/09/01/gorse-is-not-people",
"https://www.newyorker.com/magazine/2008/02/11/free-radicals-2",
"https://www.newyorker.com/magazine/2007/07/09/if-i-vanished",
"https://www.newyorker.com/magazine/2014/12/01/one-gram-short",
"https://www.newyorker.com/magazine/2011/01/24/naima",
"https://www.newyorker.com/magazine/2012/01/16/a-brief-encounter-with-the-enemy",
"https://www.newyorker.com/magazine/2015/01/19/breadman",
"https://www.newyorker.com/magazine/2020/11/30/the-winged-thing",
"https://www.newyorker.com/magazine/2017/01/16/chairman-spaceman",
"https://www.newyorker.com/magazine/2016/10/17/the-edge-of-the-shoal",
"https://www.newyorker.com/magazine/2008/04/14/the-lie-3",
"https://www.newyorker.com/magazine/2015/09/21/my-curls-have-blown-all-the-way-to-china",
"https://www.newyorker.com/magazine/2006/11/06/paper-losses",
"https://www.newyorker.com/magazine/2014/04/21/hubcaps",
"https://www.newyorker.com/magazine/2019/01/14/all-rivers",
"https://www.newyorker.com/magazine/2013/04/01/marjorie-lemke",
"https://www.newyorker.com/magazine/2010/04/26/edgemont-drive",
"https://www.newyorker.com/magazine/2017/10/30/the-sinking-of-the-houston",
"https://www.newyorker.com/magazine/2009/05/25/avas-apartment",
"https://www.newyorker.com/magazine/2010/05/10/uncle-rock",
"https://www.newyorker.com/magazine/2009/06/08/good-neighbors",
"https://www.newyorker.com/magazine/2018/07/09/under-the-wave",
"https://www.newyorker.com/magazine/2015/01/12/crabapple-tree",
"https://www.newyorker.com/magazine/2013/07/08/all-ahead-of-them",
"https://www.newyorker.com/magazine/2019/02/04/what-can-you-do-with-a-general",
"https://www.newyorker.com/magazine/2008/08/04/clara-roberto-bolano",
"https://www.newyorker.com/magazine/2008/04/07/the-house-behind-a-weeping-cherry",
"https://www.newyorker.com/magazine/2019/04/01/the-match",
"https://www.newyorker.com/magazine/2008/12/01/in-other-rooms-other-wonders",
"https://www.newyorker.com/magazine/2013/02/25/the-furies-2",
"https://www.newyorker.com/magazine/2017/11/20/the-sightseers",
"https://www.newyorker.com/magazine/2018/10/29/waugh",
"https://www.newyorker.com/magazine/2012/10/08/fischer-vs-spassky",
"https://www.newyorker.com/magazine/2007/03/12/see-the-other-side",
"https://www.newyorker.com/magazine/2007/11/19/or-else",
"https://www.newyorker.com/magazine/2013/10/14/katania",
"https://www.newyorker.com/magazine/2018/08/06/displaced",
"https://www.newyorker.com/magazine/2018/07/30/i-walk-between-the-raindrops",
"https://www.newyorker.com/magazine/2020/03/30/futures",
"https://www.newyorker.com/magazine/2016/09/26/a-short-history-of-zaka-the-zulu",
"https://www.newyorker.com/magazine/2017/04/03/signal-john-lanchester",
"https://www.newyorker.com/magazine/2019/06/10/conduction",
"https://www.newyorker.com/magazine/2014/10/13/scheherazade-3",
"https://www.newyorker.com/magazine/2014/05/12/the-fugitive",
"https://www.newyorker.com/magazine/2011/09/12/an-anonymous-island",
"https://www.newyorker.com/magazine/2012/10/22/breatharians",
"https://www.newyorker.com/magazine/2009/01/26/the-elephant",
"https://www.newyorker.com/magazine/2020/01/06/playing-metal-gear-solid-v-the-phantom-pain",
"https://www.newyorker.com/magazine/2016/05/16/a-life-of-adventure-and-delight-by-akhil-sharma",
"https://www.newyorker.com/magazine/2006/10/02/other-peoples-deaths",
"https://www.newyorker.com/magazine/2016/05/30/fable-by-charles-yu",
"https://www.newyorker.com/magazine/2011/05/30/mm-world",
"https://www.newyorker.com/magazine/2021/05/31/a-s-d-f",
"https://www.newyorker.com/magazine/2016/08/29/gender-studies-by-curtis-sittenfeld",
"https://www.newyorker.com/magazine/2011/10/10/oubliette",
"https://www.newyorker.com/magazine/2008/05/19/east-wind",
"https://www.newyorker.com/magazine/2013/04/15/the-night-of-the-satellite",
"https://www.newyorker.com/magazine/2013/02/04/zusya-on-the-roof",
"https://www.newyorker.com/magazine/2015/08/31/the-apartment",
"https://www.newyorker.com/magazine/2019/08/19/elliott-spencer",
"https://www.newyorker.com/magazine/2009/09/14/the-lower-river",
"https://www.newyorker.com/magazine/2012/04/02/p-e",
"https://www.newyorker.com/magazine/2007/05/28/puppy-2",
"https://www.newyorker.com/magazine/2006/09/04/kansas-2",
"https://www.newyorker.com/magazine/2013/05/13/art-appreciation",
"https://www.newyorker.com/magazine/2016/10/03/to-the-moon-and-back",
"https://www.newyorker.com/magazine/2007/01/22/heirs-2",
"https://www.newyorker.com/magazine/2007/06/04/faith-5",
"https://www.newyorker.com/magazine/2008/11/24/ghosts-fiction-edwidge-danticat",
"https://www.newyorker.com/magazine/2019/11/04/gods-caravan",
"https://www.newyorker.com/magazine/2012/06/04/black-box",
"https://www.newyorker.com/magazine/2010/01/25/trailhead",
"https://www.newyorker.com/magazine/2006/12/25/monkey-hill",
"https://www.newyorker.com/magazine/2018/11/05/backpack",
"https://www.newyorker.com/magazine/2018/12/24/acceptance-journey",
"https://www.newyorker.com/magazine/2007/04/16/the-stolen-pigeons",
"https://www.newyorker.com/magazine/2007/10/01/the-insufferable-gaucho",
"https://www.newyorker.com/magazine/2020/07/20/jack-and-della",
"https://www.newyorker.com/magazine/2016/05/09/three-short-moments-in-a-long-life-by-john-lheureux",
"https://www.newyorker.com/magazine/2014/11/24/eykelboom",
"https://www.newyorker.com/magazine/2017/06/19/its-a-summer-day",
"https://www.newyorker.com/magazine/2009/03/09/wiggle-room",
"https://www.newyorker.com/magazine/2015/03/23/sleep-fiction-colm-toibin",
"https://www.newyorker.com/magazine/2011/12/12/what-we-talk-about-when-we-talk-about-anne-frank",
"https://www.newyorker.com/magazine/2017/01/09/on-the-street-where-you-live",
"https://www.newyorker.com/magazine/2007/05/14/hanwell-senior",
"https://www.newyorker.com/magazine/2007/09/24/the-maserati-years",
"https://www.newyorker.com/magazine/2008/12/22/the-gangsters",
"https://www.newyorker.com/magazine/2011/07/25/matinee-robert-coover",
"https://www.newyorker.com/magazine/2015/02/23/kino",
"https://www.newyorker.com/magazine/2014/08/04/action-3",
"https://www.newyorker.com/magazine/2009/04/27/vast-hell",
"https://www.newyorker.com/magazine/2015/06/08/quaestio-de-centauris",
"https://www.newyorker.com/magazine/2014/11/17/alaska-giants-gods",
"https://www.newyorker.com/magazine/2008/11/03/the-fat-mans-race",
"https://www.newyorker.com/magazine/2012/06/04/monstro",
"https://www.newyorker.com/magazine/2019/08/26/the-loop",
"https://www.newyorker.com/magazine/2009/10/05/victory-lap",
"https://www.newyorker.com/magazine/2019/07/08/uncle-jim-called",
"https://www.newyorker.com/magazine/2016/03/14/for-the-best",
"https://www.newyorker.com/magazine/2021/03/29/future-selves",
"https://www.newyorker.com/magazine/2017/11/27/the-lost-troop",
"https://www.newyorker.com/magazine/2021/06/21/the-coast-of-new-zealand",
"https://www.newyorker.com/magazine/2018/04/16/how-did-we-come-to-know-you",
"https://www.newyorker.com/magazine/2015/06/08/escape-from-new-york",
"https://www.newyorker.com/magazine/2014/03/03/the-largesse-of-the-sea-maiden"
};

}

/*

        System.out.println("new yorker");

        int N = 74;
        Hashtable table = new Hashtable();

        for (int i = 1; i <= N; ++i)
        {
            String page = null;
            try
            {


                Process p = Runtime.getRuntime().exec("curl " + "https://www.newyorker.com/magazine/fiction/page/" + i);

                //log(p.exitValue());

                byte[] pbuffer = U.readInputStream(p.getInputStream());


                page = new String(pbuffer, 0, pbuffer.length, "UTF-8");


                //log(page);
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
            int k = 0;
            String f = "/magazine/2";
            
            
            while (true)
            {
                int p = page.indexOf(f, k);
                if (p < 0)
                    break;

                int q = page.indexOf("\"", p);

                //log(p + " " + q + " " + page.length());

                String x = page.substring(p, q);

                if (x.length() > 20) 
                {
                    //log(x.charAt(20) + "");



                    if (x.charAt(20) == '/')
                
                    {


                        table.put(x, "https://www.newyorker.com" + x);

                    }
                }

                k = q;
            }
        }

        list(table);

        log("complete");


*/
