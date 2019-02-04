import IPython.core.display
import pkg_resources


def plot_force_directed_graph():
    
    # load html and javascript from template files
    resource_package = __name__ 
    html_template = 'd3fdgraph.html'
    html = pkg_resources.resource_string(resource_package, html_template).decode('utf-8')
    javascript_template = 'd3fdgraph.js'
    js_code = pkg_resources.resource_string(resource_package, javascript_template).decode('utf-8')


    # display html in notebook cell
    IPython.core.display.display_html(IPython.core.display.HTML(html))

    # display (run) javascript in notebook cell
    IPython.core.display.display_javascript(IPython.core.display.Javascript(data=js_code))
    pass