d3fdgraph
=========

Plots an interactive force directed graph in a jupyter notebook, taking data from a dataframe of nodes and link weights.


Why d3fdgraph?
--------------

Working with data using **python** in the **jupyter** notebook provides many options for visualising that data. 

The **pandas** library provides convenient common visualisations, and there's always the venerable **matplotlib** for more bespoke plots. The new **vega-lite** library is enabled by default in jupyterlab.

Sometimes we want to plot the relationships between things as a graph of linked nodes. 

The **networkx** library can plot graphs in a notebook but the plots are static, and only really suitable for smaller data.

Being able to **interactively** adjust graphs really helps explore larger data.

That's what **d3fdgraph** does.


Installing d3fdgraph
--------------------

Installing **d3fdgraph** is easy.
:: 

 pip install d3fdgraph

This has been tested with Anaconda Python 3.


How To Use
----------

To use **d3fdgraph** in a notebook we import the library.
::

 import d3fdgraph


**d3fdgraph** takes data in the form of a **pandas dataframe**. 

That dataframe must have 3 columns:

 * The first column contains the nodes at the **start** of a link. 

 * The second column contains the nodes at the **end** of a link. 

 * The third column contains a link **weight** number. It must be more than 0. 

The larger the **weight**, the more strongly related the two nodes at each end of this link.

Here is an example dataframe:

=======  ======= ========
source   target  weight
=======  ======= ========
apple    orange  1
apple    banana  2
orange   mango   2
orange   lemon   3
=======  ======= ========

Each row is a link:

 * The first row is a link between ``apple`` and ``orange``. These two are connected with a weight of 1.
 * The second row is a link between ``apple`` and ``banana``. These two are more strongly related, with a weight 2.
 * The fourth row is the strongest link, with weight 3, between ``orange`` and ``lemon``.

The column names don't have to be ``source``, ``target`` and ``weight``. You can have different column names, but it is a good idea to use descriptive names. 

The order of the 3 columns is what matters. **d3fdgraph** will use the first column as the source nodes, the second as the target, and the third as link weights.

To draw an interactive force directed graph of these nodes and links we simply pass this dataframe to the **plot_force_directed_graph()** function.
::

 d3fdgraph.plot_force_directed_graph(dataframe)

Here is an example of a graph made from different data.

.. image:: https://github.com/intuitivetextmining/d3fdgraph/blob/master/images/d3fdgraph_recipes.gif

The nodes are labelled with the names of the nodes, as described in the pandas dataframe.

The nodes are constrained from flying off the edge of the canvas.


Interactivity
-------------

You can use your pointer to drag nodes around to adjust the graph.

Double-clicking a node makes it jump to the centre of the canvas, from where it might depart slightly due to the simulated forces.


Additional Parameters
---------------------

::

 plot_force_directed_graph(node1_node1_weight, node_radius=3, link_distance=20, collision_scale=4)

You don't have to use the additional parameters, but they might help improve the readability of your graph.

 * **node_radius** is the radius of the circles drawn for each node, default 3
 * **link_distance** is the length of each link, before divided by the link weight, default 20
 * **collision_scale** is the multiple of the node radius that excludes other nodes, default 4
 * **link_width_scale** scales the width of the drawn links with link weight, default is 4


Example Notebook
----------------
A simple jupyter notebook showing how **d3fdgraph** can be used is here:

* `simple example notebook <https://github.com/intuitivetextmining/d3fdgraph/blob/master/examples/d3fdgraph_simple_test.ipynb>`_


Note
----

Note that **d3fdgraph** is only useful in a jupyter notebook. It isn't useful in a terminal, and hasn't been tested in other kinds of python notebook.
