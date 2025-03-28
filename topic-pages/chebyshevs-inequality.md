---
title: 'Chebyshev’s Inequality — a simple proof'
date: 2011-01-26T21:34:48+00:00
layout: page
permalink: /chebyshevs-inequality/
mathjax: true
---
To prove Chebyshev’s inequality, we start with the definition of expectation. But instead of using the definition for discrete random variables, we use the definition for continuous random variables. In other words, instead of using the formula

$$ E[Y] = \sum_{i=0}^{\infty} y_i \; P(Y\!=y_i) $$

where \\(P(Y=y_i)\\) is the probability that \\(Y= y_i \\) , we use

$$ E[Y]=\int_{-\infty}^{+\infty} y\; p(y)\; dy $$

where \\(p(y)\\) is the probability density function for \\(Y\\).

Let us assume that the random variable \\(Y\\) can only take positive values, it follows that:

$$
\begin{eqnarray*}

E[Y] & = & \int_{-\infty}^{+\infty} y\; p(y)\; dy = \int_{0}^{+\infty} y\; p(y)\; dy \\

     & = & \int_{0}^{a} y\; p(y)\; dy + \int_{a}^{+\infty} y\; p(y)\; dy \\

\end{eqnarray*}
$$


In the last step, we simply split the integration interval into two, from zero to \\(a\\) and then from \\(a\\) to infinity. We can now substitute the respective smallest value for \\(y\\) in each of those two integrals to obtain an inequality.

$$
\begin{eqnarray*}

E[Y] & = & \int_{0}^{a} y\; p(y)\; dy + \int_{a}^{+\infty} y\; p(y)\; dy \\

E[Y] & \geq & \int_{0}^{a} 0\; p(y)\; dy + \int_{a}^{+\infty} a\; p(y)\; dy \\

E[Y] & \geq & 0 + a\int_{a}^{+\infty} \; p(y)\; dy \\

E[Y] & \geq & a \;P(Y\!\! > a)\\

\end{eqnarray*}
$$

Rearranging this last result we obtain Markov’s inequality:

$$ P(Y\!\! > a) \leq \frac{E[Y]}{ a } $$

To be able to use the above inequality, the random variable \\(Y\\) must only taken on positive values. We avoid this limitation by making the substitution \\(Y=(X-\mu)^2\\) where \\(\mu=E[X]\\). No matter what values \\(X\\) takes on \\((X-\mu)^2\\) is never negative. Making this substitution in the equation above, we obtain

$$ P(\;(X-\mu)^2 > a \;) \leq \frac{E[(X-\mu)^2]}{ a } $$

The numerator on the right is just the variance of \\(X\\)

$$ P(\;(X-\mu)^2 > a\; ) \leq \frac{Var[X]}{ a } $$

Finally, we also substitute \\(a=b^2\\) to obtain Chebyshev’s inequality

$$ P(|X-\mu| > b\; ) \leq \frac{Var[X]}{ b^2 } $$

This inequality bounds the probability of a random variable \\(X\\) being far away from its mean. It holds independent of the distribution of \\(X\\).
