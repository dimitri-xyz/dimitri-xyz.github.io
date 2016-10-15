---
title: 'Time × Interest Rate'
layout: post
permalink: /2016/10/13/the-time-interest-rate-tradeoff/
---

There is a trade-off between the rate of return on your investments and how long you need to wait to achieve your goals. Imagine you want to have a million dollars when you retire and you can save $1000 a month. If the rate of return on your investments is 8% per year, it will take you 26 years to reach your goal of 1 million dollars. That is a long time! Could we speed this up by getting better returns? How long would it take to accumulate 1 million if your rate of return was 12% instead of 8%? You can drag the yellow marker and play with the calculator below to find out. The graph shows all the possibilities.

<div id="time_vs_ror_calculator">
    <table border="1">
        <tr><td>
            <div id="graph">
                <svg width="400" height="200" >
                    <rect id="rect1" x="10" y="10" width="200" height="120" style="stroke:#000000; fill:none;"/>
                </svg>
            </div>
        </td></tr>    
        <tr><td>
            <div id="controls">
                <table border="0" style="display:inline-block">
                    <tr><td>monthly:</td></tr>
                    <tr><td><input type="number" name="monthly" value="1000.00"></td></tr>
                </table>

                <table border="0" style="display:inline-block">
                    <tr><td>desired:</td></tr>
                    <tr><td><input type="number" name="desired" value="1000000"></td></tr>
                </table>

                <table border="0" style="display:inline-block">
                    <tr><td>rate of return (%):</td></tr>
                    <tr><td><input type="number" name="ror" value="10.00"></td></tr>
                </table>

                <table border="0" style="display:inline-block">
                    <tr><td>duration (years):</td></tr>
                    <tr><td><input type="number" name="duration" value="20"></td></tr>
                </table>

                <table border="0" style="display:inline-block">
                    <tr><td><input id="reset"  type="button" name="duration" value="reset"></td></tr>
                    <tr><td><input id="redraw" type="button" name="duration" value="draw again"></td></tr>
                </table>
            </div>
        </td></tr>    
    </table>
</div>
<script src="/assets/time-ror-calc.js" type="text/javascript"></script>

We calculate according to the standard compound interest [formula](/topic-pages/gp-sum).

### Taxes and Inflation

The calculator assumes zero inflation or taxes, but shows the trade-off between time and interest rate. If you want to take taxes and inflation into account simply subtract those two from the returns you get. For example, if your gross rate of return is 10% per year, but you are taxed a capital gains tax of 15% and inflation is running at 2% per year, your true rate of return is 10-1.5-2 = 6.5%. This is what you should put in the calculator above. (Note: This last part is only an approximation, but a pretty good one.)
