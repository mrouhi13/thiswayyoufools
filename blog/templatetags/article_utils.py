import math
import re

from django import template
from django.template.defaultfilters import stringfilter
from django.utils.html import strip_tags

register = template.Library()


def count_words(html_string):
    word_string = strip_tags(html_string)
    matching_words = re.findall(r'\w+', word_string)
    count = len(matching_words)
    return count


@register.filter
@stringfilter
def get_read_time(html_string):
    count = count_words(html_string)
    read_time = math.ceil(count / 275.0)

    if read_time <= 1:
        return '{0} Minute'.format(read_time)

    return '{0} Minutes'.format(read_time)
