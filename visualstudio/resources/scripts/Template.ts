﻿class Template {
    static RuleMenuItem: HandlebarsTemplateDelegate = <any>'<li><a  class="rule-link" href="#version={{currentVersion}}&ruleId={{rule.Key}}" title="{{rule.Key}}: {{rule.Data.0.Title}}">{{rule.Key}}: {{rule.Data.0.Title}}</a></li>';
    static RuleMenuHeaderVersion: HandlebarsTemplateDelegate = <any>(
        '<h2>List of rules</h2>' +
        '<span id="rule-version-cont">' +
            '<a id="rule-version" href="#version={{controller.currentVersion}}">in version {{controller.currentVersion}}</a>' +
            '<a id="language-selector" class="rule-link" href="#version={{controller.currentVersion}}{{next-language language}}" title="Toggle rule language">{{language-text language}}</a>' +
        '</span>');
    static RuleMenuHeaderVersionError: HandlebarsTemplateDelegate = <any>'<span id="rule-version-cont"><a href="#">Go to latest version</span></a>';
    static RulePageContent: HandlebarsTemplateDelegate = <any>(
        '<div class="rule-details-container tabs">' +
            '{{#each Data}}' +
                '<div class="rule-details tab">' +
                    '<input type="radio" id="rule-detail-tab-{{../Key}}-{{@index}}" name="rule-detail-tab-group-{{../Key}}" {{{tab-activation @index ../Data.length 0}}}/>' +
                    '<label for="rule-detail-tab-{{../Key}}-{{@index}}">{{language-text Language}}</label>' +
                    '<div class="tab-content">' +
                        '<div class="rule-meta">' +
                            '<h1 id="rule-title">{{Title}}</h1>' +
                            '<span id="rule-id" class="id">Rule ID: {{../Key}}</span>' +
                            '<div class="rules-detail-properties">' +
                                '<span class="tags" id="rule-tags" title="Tags" style="{{{rule-tags-visibility Tags}}}">{{rule-tags-render Tags}}</span>' +
                                '<span class="severity rule-severity-{{IdeSeverity}}" id="rule-severity" title="Severity" style="{{{rule-severity-visibility Severity}}}">{{Severity}}</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="rule-description" id="rule-description">{{{Description}}}</div>' +
                    '</div>' +
                '</div>' +
            '{{/each}}' +
        '</div>');
    static RuleErrorPageContent: HandlebarsTemplateDelegate = <any>(
        '<div class="rule-details">' +
            '<div class="rule-meta">' +
                '<h1 id="rule-title">Error</h1>' +
                '<span id="rule-id" class="id">{{message}}</span>' +
            '</div>' +
        '</div>');
    static RuleFilterElement: HandlebarsTemplateDelegate = <any>'<li><input type="checkbox" checked="checked" id="{{tag}}" /><label for="{{tag}}">{{tag}}</label></li>';


    private static init() {
        Handlebars.registerHelper('language-text', function (num) {
            if (num == Language.CSharp) {
                return 'C#';
            } else if (num == Language.VisualBasic) {
                return 'VB.Net';
            }
            return 'C#/VB.Net';
        });
        Handlebars.registerHelper('next-language', function (num) {
            if (num == Language.CSharp) {
                return '&language=vbnet';
            } else if (num == Language.VisualBasic) {
                return '';
            }
            return '&language=cs';
        });
        Handlebars.registerHelper('rule-tags-visibility', function (tags) {
            if (!tags || tags == "" || (Array.isArray(tags) && (<Array<string>>tags).length == 0)) {
                return 'display: none;'
            }
            return '';
        });
        Handlebars.registerHelper('rule-severity-visibility', function (severity) {
            if (!severity) {
                return 'display: none;'
            }
            return '';
        });
        Handlebars.registerHelper('tab-activation', function (index, max, selectedIndex) {
            if (selectedIndex >= max) {
                if (index == 0) {
                    return 'checked';
                }
                return '';
            }

            if (selectedIndex == index) {
                return 'checked';
            }

            return '';
        });

        Handlebars.registerHelper('rule-tags-render', function (tags) {
            return tags.join(', ');
        });

        Template.RuleMenuItem = Handlebars.compile(Template.RuleMenuItem);
        Template.RuleMenuHeaderVersion = Handlebars.compile(Template.RuleMenuHeaderVersion);
        Template.RuleMenuHeaderVersionError = Handlebars.compile(Template.RuleMenuHeaderVersionError);
        Template.RulePageContent = Handlebars.compile(Template.RulePageContent);
        Template.RuleErrorPageContent = Handlebars.compile(Template.RuleErrorPageContent);
        Template.RuleFilterElement = Handlebars.compile(Template.RuleFilterElement);
    }

    static eval(template: HandlebarsTemplateDelegate, context: any): string {
        return template(context);
    }

    private static hack_static_run = Template.init();
}