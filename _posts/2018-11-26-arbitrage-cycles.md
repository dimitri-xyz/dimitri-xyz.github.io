---
title: 'Longest simple cycles for fun and profit'
layout: post
permalink: /crypto-arbitrage-cycles/
mathjax: true
---

Algorithms are an incredibly interesting field. In this post, we explore a rather profitable application of their power: finding arbitrage cycles in cryptocurrency markets.

What does it mean to finding an arbitrage cycle? We want to find a cycle of crypto currencies that we can trade, such that after we complete all the trades, we have more than we started with. There are many automated solutions to do this for pairs of crypto currencies.

For example, traders can look at the price differences in the Bitcoin/Ethereum markets between two exchanges (such as Coinbase and Binance). If the price is different between those exchanges, we may be able to find a cycle such as:

1. Buy  Ethereum at Binance (paying with Bitcoins)
2. Sell Ethereum at Coinbase (receiving Bitcoins)

If we sell as much Ether as we buy, the amount of Ether we have will not change, but we may end up with more (or less) Bitcoins than we started with. We could describe this as a short cycle:

BTC ⟶ ETH ⟶ BTC

In this example, each cryptocurrency is a vertex in a graph and there is a directed edge from \\(V_1\\) to \\(V_2\\) (e.g. from BTC to ETH) if there is a market where we can buy some \\(V_2\\) paying with \\(V_1\\). The above cycle may or may not be profitable to trade, we need to investigate. There may also be cycles with more edges. For example:

BTC → LTC → ETH → EOS → BCH → ADA → BTC

To make a profit using this cycle, we would need to successfully execute 6 orders, but it may still be profitable. In fact, it might be more profitable than all other opportunities available. This is a key insight.


### Solving the Wrong Problem

The problem we are trying to solve is very similar to but *not the same as* the problem of finding negative cycles in a directed graph. If we label each edge in the graph described in the example above with the logarithm of the (buy) price, there will be an arbitrage cycle if and only if there is a negative cycle in the graph.

Given the popularity of single source and all-pairs shortest path algorithms, finding negative cycles in graphs has become a textbook problem [^1]. These algorithms are fast and elegant. However, they do not do what we want.

The problem is that the Floyd–Warshall algorithm and others will tell us if there is a profitable arbitrage cycle (i.e. a negative cycle), but they will *not* tell us if the negative cycle found is the only one available or which cycle is the most profitable when there are many. In short, they do not solve the problem we're interested in solving. We want to find *all* negative cycles (all profitable arbitrage opportunities), not just one.

To find the most profitable cycle, we actually need to solve the longest simple cycle problem, instead. We say a cycle is simple if there are no repeated vertices in it. Unfortunately, this has been shown to be NP-hard [^2]. To see why, consider a reduction. The reduction is from the Hamiltonian path problem to an instance of the longest simple path when the edge weights are all 1. Shall we despair?

### Separating Topology From Profitability

I would not be writing this blog post if the answer was to give up and go home! There are two facts that help us:

1. Our graph is sparse - It is much easier to enumerate all simple cycles in a sparse graph as there are far fewer possible paths to check. So, even an algorithm with an exponential running time in the worst-case may perform reasonably well for our purposes.
2. We have plenty of time to calculate - Although the prices of crypto currencies change multiple times a second, new markets become available and/or disappear only every day or so.

Again, consider the graph where each vertex represents a crypto currency and there is a directed edge between vertices A and B if there is a market for buying B by making payments in A. We can separate changes in the topology of this graph from changes in the weight of each edge. Changes in edge weight are very frequent, as the prices change multiple times a second, but changes in the overall topology of the graph (i.e. which markets exist) are much less frequent. Exchanges have to do engineering work to list a new crypto token, so it takes a while for those markets to be created, thus changing the topology.

There is one more restriction that we will not consider in detail here. We do not actually need to find all profitable cycles. We need all profitable cycles *that we can use*. It turns out, that it is too risky to use cycles with many edges in them, even if the sum of all edge values is quite large. If we have 34 edges in a cycle, we need to execute 34 orders to capture the arbitrage opportunity. This is too risky. Order placement is not perfect and the market prices change constantly. Maybe it is best to look for cycles with at most 11 edges, for example. This means that we are actually looking for cycles with a large sum of edge values but with only a small number of edges.

We can use Johnson's elementary circuit enumeration algorithm [^3] to find all simple cycles in our sparse graph. Because the topology of the graph does not change very often, it does not matter if this calculation takes a long time. This is what lets us separate changes in the topology of the graph from changes in edge values (which represent changes in price).

### Maximal Profitability

After we use Johnson's algorithm to find all simple cycles, our task becomes much simpler.

Assume we have obtained a list of all simple cycles (or elementary circuits) in the graph. Call these cycles \\(C_i\\). These \\(C_i\\) represent all possible arbitrage cycles. We can then calculate the profit or loss we would get by performing the trades described by each cycle. There may be a very large number of such cycles, but *we can do this calculation in parallel*, so it doesn't take very long!

We do have to be careful when two distinct cycles trade on the same markets. If we buy up some Bitcoin at Coinbase when executing trades related to our most profitable cycle, that initial Bitcoin price may no longer be available when we want to execute the trades in the second most profitable cycle. We need an adjustment here, but this is not an insurmountable problem.

Assume there are two profitable cycles in the graph \\(C_1\\) and \\(C_9\\), which one should we pick? The answer is always: the most profitable one. Unfortunately, the profit or loss we obtain in a cycle is not a single value, but a function of the volume traded. For example, we may obtain a profit when trading 1 BTC, but suffer a loss when trading 2 BTC. That is, the profit or loss depends on the volume traded.

For each available cycle \\(C_i\\), we need to obtain its "transfer function" \\(T_i(x)\\). This function represents the amount we get out of the cycle when we put \\(x\\) units in. If \\(T_i(x) > x\\) for some \\(x\\), the cycle can be profitable as we can get more out than we put in.

We know that any transfer function \\(T_i(x)\\) starts at the origin (you get zero when you pay zero) and is monotonically increasing (the more you pay, the more you get). Assuming all orders on the order books can be partially executed, we can also deduce the \\(T_i\\) are piecewise linear and *concave* (as better prices always execute first). The concavity is very important because it gives us a simple algorithm to maximize our profit when trading in all available cycles: *water filling*.

The concavity of the \\(T_i\\) means it is optimal to be greedy. Starting at 0, for each extra \\(\delta x\\) of crypto currency we want to trade, we evaluate all derivatives \\(T_i'(0)\\) and choose the highest one, i.e. \\(max \; T_i'(0) \\). This is the most profitable cycle for any initial amount we want to trade. Because the \\(T_i\\) are all piecewise linear, we can keep adding volume to the chosen cycle until the end of the current line segment. We are guaranteed this will be the best deal until the initial segment ends.

Once the current segment ends, \\(\frac{dT_i}{dx}\\) needs to be re-evaluated for the new segment. After we take into account the new (lower) available returns at the new segment (after we already traded \\(\delta x\\) ), it may be that another cycle \\(C_j\\) becomes more profitable than cycle \\(C_i\\) and we repeat the process. We keep doing this while \\(max \; \frac{dT_i}{dx} > 1\\) and \\(T_i(x) > x\\), beyond this point, trading ceases to be profitable. We may also stop before any desired rate of return, for example 1.05 for a minimum of 5% return, instead of 1.

### Conclusion

There is still a lot more to be done to run a profitable trading operation. For example, we still need to calculate exactly which orders to place in each market. Thankfully, this can be done through a different interpreter on the same arbitrage cycle description. We also need to take into account the probability of execution failures and other "real-world" factors, but I hope this exposition convinced you that finding arbitrage cycles is an interesting algorithmic problem. I also hope it is easy to see how important it is to clearly understand exactly which algorithmic problems we need to solve and which we can avoid (or work around).

*I would like to thank Fabricio Oliveira and Balaji Venkatachalam for their many helpful suggestions to improve this post.*

[^1]: [https://courses.csail.mit.edu/6.046/spring04/handouts/ps7sol.pdf](https://courses.csail.mit.edu/6.046/spring04/handouts/ps7sol.pdf)

[^2]: Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein. 2001. Introduction to Algorithms, Second Edition (2nd ed.). The MIT Press

[^3]: [Donald B. Johnson "Finding All the Elementary Circuits of a Directed Graph", SIAM J. Comput., 4(1), 77–84, 1975](https://epubs.siam.org/doi/abs/10.1137/0204007)
