import IPython.core.display
import pkg_resources

import networkx
import networkx.readwrite.json_graph

import random


def plot_force_directed_graph(node1_node1_weight):

    # column names for node source and target, and edge attributes
    node_source_name = node1_node1_weight.columns.values[0]
    node_target_name = node1_node1_weight.columns.values[1]
    link_edge_name = node1_node1_weight.columns.values[2]

    # convert node1_node1_weight to graph
    graph = networkx.from_pandas_edgelist(node1_node1_weight, source=node_source_name, target=node_target_name, edge_attr=link_edge_name)

    # convert graph nodes and inks to json, ready for d3
    graph_json = networkx.readwrite.json_graph.node_link_data(graph)
    graph_json_nodes = graph_json['nodes']
    graph_json_links = graph_json['links']

    
    # load html and javascript from template files
    resource_package = __name__ 
    html_template = 'd3fdgraph.html'
    html = pkg_resources.resource_string(resource_package, html_template).decode('utf-8')
    javascript_template = 'd3fdgraph.js'
    js_code = pkg_resources.resource_string(resource_package, javascript_template).decode('utf-8')

    # generate random identifier for SVG element, to avoid name clashes if used multiple times in a notebook
    random_id_string = str(random.randrange(1000000,9999999))
    # replace placeholder in both html and js templates
    html = html.replace('%%unique-id%%', random_id_string)
    js_code = js_code.replace('%%unique-id%%', random_id_string)

    # substitute links and data
    js_code = js_code.replace('%%links%%', str(graph_json_links))
    js_code = js_code.replace('%%nodes%%', str(graph_json_nodes))
    js_code = js_code.replace('%%edge_attribute%%', link_edge_name)

    # display html in notebook cell
    IPython.core.display.display_html(IPython.core.display.HTML(html))

    # display (run) javascript in notebook cell
    IPython.core.display.display_javascript(IPython.core.display.Javascript(data=js_code))
    pass